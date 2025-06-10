// src/services/xag.service.ts
import { User } from '../models/user.model';
import { Device } from '../models/device.model';
import { TokenService } from './token.service';
import { ExternalApiService } from '.'

export class MapService {
  static async WorkList(req: any): Promise<any> {
    try {
        // {
        //     "baseTime": 1747290942740,
        //     "limit": 500,
        //     "updateTime": 0,
        //     "lastSyncTime": 1748586942740,
        //     "last_sync_time": 1748586942740
        // }
        const result = await ExternalApiService.RedirectPost(
            req, 
            'dservice.xa.com', 
            'api/land/v1/resume/work/list'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return {
                "success": true,
                "data": [],
                "message": "success",
                "status": 200
            };
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async InitAllRoutes(req:any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectGet(
            req, 
            'dservice.xa.com', 
            'api/land/v1/route/initAllRoute'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "success": true,
                "data": {
                    "version": 0,
                    "ossList": []
                },
                "message": "success",
                "status": 200
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async InitAllLand(req:any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectGet(
            req, 
            'dservice.xa.com', 
            'api/land/v1/initAllLand'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "success": true,
                "data": {
                    "version": 0,
                    "ossList": []
                },
                "message": "success",
                "status": 200
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async Authority(req:any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectGet(
            req, 
            'dservice.xa.com', 
            'api/land/v1/cloud/authority'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "success": true,
                "data": {
                    "is_authority": 0
                },
                "message": "success",
                "status": 200
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async DeletedFlightImageParentTaskGroup(req:any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectGet(
            req, 
            'aerial-survey.xa.com', 
            'flightImageParentTaskGroup/deleted/list'
        )
        
        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "status": 200,
                "message": null,
                "data": []
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async DeletedLandList(req:any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectGet(
            req, 
            'dservice.xa.com', 
            'api/land/v1/deleted/guid/list'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "success": true,
                "data": {
                    "list": [],
                    "current_time": Date.now()
                },
                "message": "success",
                "status": 200
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async DeletedPrescriptionList(req:any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectGet(
            req, 
            'dservice.xa.com', 
            'api/work/v1/prescription/deleted/guid/list'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "success": true,
                "data": {
                    "list": [],
                    "current_time": Date.now()
                },
                "message": "success",
                "status": 200
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async Count(req:any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectGet(
            req, 
            'dservice.xa.com', 
            'api/land/v1/count'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "success": true,
                "data": {
                    "count": 0,
                    "first_time": 1658482270000
                },
                "message": "success",
                "status": 200
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async PageByGuid(req:any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectGet(
            req, 
            'dservice.xa.com', 
            'api/land/v1/myLand/pageByGuid'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "success": true,
                "data": {
                    "count": 0,
                    "currentTime": Date.now(),
                    "list": []
                },
                "message": "success",
                "status": 200
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async FlightImageParentTaskGroupPage(req:any): Promise<any> {
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
            return({
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
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async FlightImageTaskGroupPageFinish(req:any): Promise<any> {
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
            'flightImageTaskGroup/page'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
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
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async lntOrCloud(req:any): Promise<any> {
    try {	
        const result = await ExternalApiService.RedirectGet(
            req, 
            'aerial-survey.xa.com', 
            'flag/lntOrCloud'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "status": 200,
                "message": null,
                "data": "cloud"
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async FlightImageTaskPage(req:any): Promise<any> {
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
            'flightImageTask/page'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "status": 200,
                "message": null,
                "data": {
                    "total": 0,
                    "pageIndex": requestData.page.pageIndex,
                    "pageSize": requestData.page.pageSize,
                    "records": []
                }
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async PrescriptionList(req:any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectGet(
            req, 
            'dservice.xa.com', 
            'api/work/v1/prescription/list'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "success": true,
                "data": {
                    "records": [],
                    "total": 0,
                    "size": 0,
                    "current": 1,
                    "orders": [],
                    "searchCount": true,
                    "pages": 1
                },
                "message": "success",
                "status": 200
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async LandDetail(req:any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectGet(
            req, 
            'dservice.xa.com', 
            'api/land/v1/detail'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "success": true,
                "data": null,
                "message": "success",
                "status": 200
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async Detail(req:any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectGet(
            req, 
            'dservice.xa.com', 
            'api/land/v1/route/getDetail'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "success": true,
                "data": null,
                "message": "success",
                "status": 200
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async LandLists(req:any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectGet(
            req, 
            'dservice.xa.com', 
            'api/land/v1/tag/lists'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "success": true,
                "data": {
                    "list": []
                },
                "message": "success",
                "status": 200
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async RoutesList(req:any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectGet(
            req, 
            'dservice.xa.com', 
            'api/land/v1/route/getRoutesList'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "success": true,
                "data": {
                    "lists": [],
                    "count": 0,
                    "deletedGuids": []
                },
                "message": "success",
                "status": 200
        });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async AllGroupList(req:any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectGet(
            req, 
            'dservice.xa.com', 
            'api/land/v1/group/list/all'
        )

        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "success": true,
                "data": {
                    "list": []
                },
                "message": "success",
                "status": 200
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async FlightPage(req:any): Promise<any> {
    try {
        const requestData = { ...req.body };
        const result = await ExternalApiService.RedirectPost(
            req, 
            'aerial-survey.xa.com', 
            'flightImageParentTask/page'
        )
        // {
        //     "page": {
        //         "pageIndex": 1,
        //         "pageSize": 100
        //     },
        //     "startCreateTime": 1,
        //     "userId": "A66551855062225AE2D2323124A9A1C5"
        // }
        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "status": 200,
                "message": null,
                "data": {
                    "total": 0,
                    "pageIndex": requestData.page.pageIndex,
                    "pageSize": requestData.page.pageSize,
                    "records": []
                }
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async ListByCondition(req:any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectPost(
            req, 
            'dservice.xa.com', 
            'api/work/v1/recordShow/listByCondition'
        )
        // {
        //     "landGuid": "29a845e4-b257-4bf5-bbe6-dc6704614204",
        //     "limit": 500
        // }
        if (result.status !== 200 || !result.success) {
            console.log('Request failded, put direct response')
            return({
                "success": true,
                "data": null,
                "message": "success",
                "status": 200
            });
        } else {
            return(result)
        }
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }
}







