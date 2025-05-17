import { Request, Response } from 'express';
import { XagService } from '../services';
import { User } from '../models/user.model';
import { Device } from '../models/device.model';

const deviceStatusCache: Record<string, any> = {};

export class XagController {
    static async getDeviceLists(req: Request, res: Response): Promise<void> {
        try {
            const headers = { ...req.headers };
            headers.host = 'dservice.xa.com'

            const result = await XagService.getDeviceLists(headers);
            console.log(JSON.stringify(result))
            res.json(result);

        } catch (error) {
            console.error('Device list error:', error);
            res.status(500).json({
                message: error instanceof Error ? error.message : 'Internal server error',
                status: 500,
            });
        }
    }

    static async Delete(req: Request, res: Response): Promise<void> {
        try {
            const { serial_number } = req.body;

            if (!serial_number) {
                res.status(400).json({ 
                    status: 400, 
                    message: "serial_number is required" 
                });
                return;
            }

            const headers = { ...req.headers };
            headers.host = 'dservice.xa.com'

            const result = await XagService.Delete(headers, serial_number);

            res.json(result);
        } catch (error) {
            console.error('Device deleting error:', error);
            res.status(500).json({
                message: error instanceof Error ? error.message : 'Internal server error',
                status: 500,
            });
        }
      }

    static async searchInfo(req: Request, res: Response): Promise<void> {
        try {
            const { serial_number } = req.query;
            
            if (!serial_number) {
                res.status(400).json({ 
                    status: 400, 
                    message: "serial_number is required" 
                });
                return;
            }

            const headers = { ...req.headers };
            const result = await XagService.SearchInfo(headers, req.query);


            // Modify new_link field to true
            if (result.data) {
                result.data.new_link = true;
                deviceStatusCache[serial_number.toString()] = result.data;
            }

            res.json(result);

        } catch (error) {
            console.error('Device search info error:', error);
            res.status(500).json({
                message: error instanceof Error ? error.message : 'Internal server error',
                status: 500,
            });
        }
    }

    static async searchStatus(req: Request, res: Response): Promise<void> {
        try {
            const { serial_number } = req.query;
            
            if (!serial_number) {
                res.status(400).json({ 
                    status: 400, 
                    message: "serial_number is required" 
                });
                return;
            }

            const headers = { ...req.headers };
            const result = await XagService.SearchStatus(headers, req.query);

            // Modify can_create field to true
            if (result.data) {
                result.data.can_create = true;
            }

            res.json(result);

        } catch (error) {
            console.error('Device search status error:', error);
            res.status(500).json({
                message: error instanceof Error ? error.message : 'Internal server error',
                status: 500,
            });
        }
    }

    static async create(req: Request, res: Response): Promise<void> {
        try {
            const requestData = req.body;
            const token = req.headers.token
            const serialNumber = requestData.serial_number;

            const user = await User.findOne({ where: { token } });
            if (!user) {
                res.status(401).json({
                    status: 401,
                    message: "Invalid token"
                });
                return;
            }

            // Get cached status data
            const statusData = deviceStatusCache[serialNumber] || {};

            // Create device in database with all required fields
            const device = await Device.create({
                serial_number: serialNumber,
                dev_id: statusData.dev_id || "Nothing",
                model: statusData.model || "Nothing",
                model_name: statusData.model_name || "Nothing",
                country_code: statusData.country_code || "",
                attribution_area: statusData.attribution_area || 1,
                remote_id: statusData.remote_id || "",
                enroll: statusData.enroll || -1,
                is_lock: statusData.is_lock || false,
                life_state: statusData.life_state || 2,
                share: statusData.share || {
                    is_shared: false,
                    from_share: false,
                    from: "",
                    expire_at: 0
                },
                network_access_license: statusData.network_access_license || [],
                authentication_info: requestData.authentication_info || statusData.authentication_info || {},
                fence_white_list: statusData.fence_white_list || false,
                bind_time: requestData.bind_time,
                lat: requestData.lat,
                lng: requestData.lng,
                name: requestData.name || statusData.name || "Some Name",
                secret: requestData.secret,
                user_id: user.id, // Associate device with user
            });

            // Remove the cached data after creation
            delete deviceStatusCache[serialNumber];

            res.status(201).json({
                status: 200,
                message: "Device created successfully",
            });
        } catch (error) {
            console.error('Device create error:', error);
            res.status(500).json({
                message: error instanceof Error ? error.message : 'Internal server error',
                status: 500,
            });
        }
    }
}