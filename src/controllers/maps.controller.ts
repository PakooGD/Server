import { Request, Response } from 'express';
import { ExternalApiService, MapService } from '../services';

export class MapsController {
    static async WorkList(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.WorkList(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async InitAllRoutes(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.InitAllRoutes(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async InitAllLand(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.InitAllLand(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async Authority(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.Authority(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    
    static async DeletedFlightImageParentTaskGroup(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.DeletedFlightImageParentTaskGroup(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async DeletedLandList(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.DeletedLandList(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async DeletedPrescriptionList(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.DeletedPrescriptionList(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async Count(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.Count(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async PageByGuid(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.PageByGuid(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async FlightImageParentTaskGroupPage(req: Request, res: Response): Promise<void> {
        try {
            const requestData = { ...req.body };
            // {
            //     "page": {
            //         "pageIndex": 1,
            //         "pageSize": 100
            //     },
            //     "startCreateTime": 1,
            //     "userId": "A66551855062225AE2D2323124A9A1C5"
            // }
            const result = await ExternalApiService.RedirectPost(
                req, 
                'aerial-survey.xa.com', 
                'flightImageParentTaskGroup/page'
            )

            if (result.status !== 200 || !result.success) {
                console.log('Request failded, put direct response')
                res.json({
                    "status": 200,
                    "message": null,
                    "data": {
                        "total": 0,
                        "pageIndex": requestData.page.pageIndex,
                        "pageSize": requestData.page.pageSize,
                        "records": []
                    },
                });
            } else {
                res.json(result)
            }
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async FlightImageTaskGroupPageFinish(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.FlightImageTaskGroupPageFinish(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async lntOrCloud(req: Request, res: Response): Promise<void> {
        try {	
            const result = await MapService.lntOrCloud(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async FlightImageTaskPage(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.FlightImageTaskPage(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async PrescriptionList(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.PrescriptionList(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async LandDetail(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.LandDetail(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async Detail(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.Detail(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async LandLists(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.LandLists(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async RoutesList(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.RoutesList(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async AllGroupList(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.AllGroupList(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async FlightPage(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.FlightPage(req)
            res.json(result)
        } catch (error) {
            console.log('Error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async ListByCondition(req: Request, res: Response): Promise<void> {
        try {
            const result = await MapService.ListByCondition(req)
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

