import { Request, Response } from 'express';
import { DeviceService } from '../services';

export class DeviceController {
    static async DeviceLists(req: Request, res: Response): Promise<void> {
        try {
            const result = await DeviceService.DeviceLists(req);
            res.json(result);
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async SearchInfo(req: Request, res: Response): Promise<void> {
        try {
            const result = await DeviceService.SearchInfo(req)
            res.json(result);
        } catch (error) {
            console.error('Device search info error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async SearchStatus(req: Request, res: Response): Promise<void> {
        try {
            const result = await DeviceService.SearchStatus(req);
            res.json(result);
        } catch (error) {
            console.error('Device search status error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async CreateDevice(req: Request, res: Response): Promise<void> {
        try {
            const result = await DeviceService.CreateDevice(req);
            res.json(result);
        } catch (error) {
            console.error('Device create error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async DeleteDevice(req: Request, res: Response): Promise<void> {
        try {
            const result = await DeviceService.DeleteDevice(req);
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

