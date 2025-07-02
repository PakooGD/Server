import { Request, Response } from 'express';
import { UpdateService } from '../services';

export class UpdateController {
        static async CheckUpdate(req: Request, res: Response): Promise<void> {
            try {
                const result = await UpdateService.CheckUpdate(req)
                res.json(result)
            } catch (error) {
                console.log('Error:', error);
                res.status(500).json({
                    message: `${error}`,
                    status: 500,
                });
            }
        }

        static async GetUpdate(req: Request, res: Response): Promise<void> {
            try {
                const result = await UpdateService.GetUpdate(req)
                res.json(result)
            } catch (error) {
                console.log('Error:', error);
                res.status(500).json({
                    message: `${error}`,
                    status: 500,
                });
            }
        }
}

