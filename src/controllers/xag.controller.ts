import { Request, Response } from 'express';
import { XagService } from '../services';
import { User } from '../models/user.model';
import { Device } from '../models/device.model';

const deviceStatusCache: Record<string, any> = {};

export class XagController {
    static async getDeviceLists(req: Request, res: Response): Promise<void> {
        try {
            const headers = { ...req.headers };
            const result = await XagService.getDeviceLists(headers);

            res.json(result);
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async searchInfo(req: Request, res: Response): Promise<void> {
        try {
            const { serial_number } = req.query;
            if (!serial_number) throw new Error(`Serial number is required`);

            const result = await XagService.RedirectSearch('/api/equipment/device/searchInfo', req.headers, req.query);

            deviceStatusCache[serial_number.toString()] = result.data;

            console.log(JSON.stringify(result))

            res.status(200).json({
                "status":200,
                "message":"Successful",
                "data":{
                    "new_link":true, // hardcoded to add any serial numbers to any accounts
                    "serial_number":serial_number,
                    "dev_id":result.data.dev_id,
                    "name":result.data.name,
                    "model": "ACS2_21", // Should be hardcoded coz leads to crash if == UAV27
                    "model_name":result.data.model_name,
                    "country_code":" "
                }
            });
        } catch (error) {
            console.error('Device search info error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async searchStatus(req: Request, res: Response): Promise<void> {
        try {
            const { serial_number } = req.query;
            if (!serial_number) throw new Error(`Serial number is required`);

            const result = await XagService.RedirectSearch('/api/equipment/device/searchStatus', req.headers, req.query);

            result.data.can_create = true; // hardcoded to add any serial numbers to any accounts

            res.status(200).json(result);

        } catch (error) {
            console.error('Device search status error:', error);
            res.status(500).json({
                message: `${error}`,
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
            if (!user) throw new Error(`User is undefinded`);

            // Get cached status data
            const statusData = deviceStatusCache[serialNumber] || {};

            // Create device in database with all required fields
            await Device.create({
                serial_number: serialNumber,
                dev_id: statusData.dev_id || "Nothing",
                model: statusData.model || "Nothing",
                model_name: statusData.model_name || "Nothing",
                country_code: statusData.country_code || " ",
                attribution_area: statusData.attribution_area || 1,
                remote_id: statusData.remote_id || " ",
                enroll: statusData.enroll || -1,
                is_lock: statusData.is_lock || false,
                life_state: statusData.life_state || 2,
                share: statusData.share || {
                    is_shared: false,
                    from_share: false,
                    from: " ",
                    expire_at: 0
                },
                network_access_license: statusData.network_access_license || [],
                authentication_info: requestData.authentication_info || statusData.authentication_info || {},
                fence_white_list: statusData.fence_white_list || false,
                bind_time: requestData.bind_time || 0,
                lat: requestData.lat || 0,
                lng: requestData.lng || 0,
                name: requestData.name || statusData.name || "Some Name",
                secret: requestData.secret || " ",
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
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async Delete(req: Request, res: Response): Promise<void> {
        try {
            const { serial_number } = req.body;
            if (!serial_number) throw new Error(`Serial number is required`);

            const result = await XagService.Delete(req.headers, serial_number);

            res.json(result);
        } catch (error) {
            console.error('Device deleting error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
}

