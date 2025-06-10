import { Request, Response } from 'express';

import { User } from '../models/user.model';
import { Device } from '../models/device.model';
import { ExternalApiService } from '../services';

export class UpdateController {
    // static async checkUpdate(req: Request, res: Response): Promise<void> {
    //     try {
    //         const headers = { ...req.headers };
    //         const requestData = req.body;
    //         const result = await XagService.checkUpdate(headers,requestData,req.query);

    //         res.json(result);
    //     } catch (error) {
    //         console.log('Device list error:', error);
    //         res.status(500).json({
    //             message: `${error}`,
    //             status: 500,
    //         });
    //     }
    // }
}

