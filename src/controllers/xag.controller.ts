import { Request, Response } from 'express';
import { XagService } from '../services';
import { User } from '../models/user.model';
import { Device } from '../models/device.model';
import { ExternalApiService } from '../services';

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
    static async WorkList(req: Request, res: Response): Promise<void> {
        try {
            // {
            //     "baseTime": 1747291936703,
            //     "limit": 500,
            //     "updateTime": 0,
            //     "lastSyncTime": 1748587936703,
            //     "last_sync_time": 1748587936703
            // }
            res.json(
                {
                    "success": true,
                    "data": [],
                    "message": "success",
                    "status": 200
                }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async InitAllRoutes(req: Request, res: Response): Promise<void> {
        try {
            res.json(
                {
                    "success": true,
                    "data": {
                        "version": 0,
                        "ossList": []
                    },
                    "message": "success",
                    "status": 200
                }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async InitAllLand(req: Request, res: Response): Promise<void> {
        try {
            res.json(
                {
                    "success": true,
                    "data": {
                        "version": 0,
                        "ossList": []
                    },
                    "message": "success",
                    "status": 200
                }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async Authority(req: Request, res: Response): Promise<void> {
        try {
            // ?version=6.3.28&point=0.0%2C0.0&platform=android
            res.json(
                {
                    "success": true,
                    "data": {
                        "is_authority": 0
                    },
                    "message": "success",
                    "status": 200
                }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async deleted(req: Request, res: Response): Promise<void> {
        try {
            // GET https://aerial-survey.xa.com/flightImageParentTaskGroup/deleted/list?startTime=0&type=parentTask&userGuid=A66551855062225AE2D2323124A9A1C5&size=50&clientId=5&noise=54484&timestamp=1748587937769&signature=e1b956fb7abc21f7da3c1eac392ea75f31fe8a1c	200	GET	aerial-survey.xa.com	/flightImageParentTaskGroup/deleted/list?startTime=0&type=parentTask&userGuid=A66551855062225AE2D2323124A9A1C5&size=50&clientId=5&noise=54484&timestamp=1748587937769&signature=e1b956fb7abc21f7da3c1eac392ea75f31fe8a1c	Fri May 30 09:52:15 MSK 2025	PT0.253S	379	Complete	
            res.json(
                {
                    "status": 200,
                    "message": null,
                    "data": []
                }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async Count(req: Request, res: Response): Promise<void> {
        try {
            // GET https://dservice.xa.com/api/land/v1/count
            res.json(
                {
                    "success": true,
                    "data": {
                        "count": 208,
                        "first_time": 1658482270000
                    },
                    "message": "success",
                    "status": 200
                }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async pageByGuid(req: Request, res: Response): Promise<void> {
        try {
            // GET https://dservice.xa.com/api/land/v1/myLand/pageByGuid?updateTime=0&guid=0&pageSize=500	
            res.json(
                {
                    "success": true,
                    "data": {
                        "count": 208,
                        "currentTime": 1748587938433,
                        "list": [{
                            "id": 5967736,
                            "guid": "8a77f22a-10d6-41a8-8cf2-2d3018202ade",
                            "name": "yvfg",
                            "md5": null,
                            "address": "Russia/Ryazan Oblast/Starozhilovsky District",
                            "teamGuid": "",
                            "groupGuid": "",
                            "groupName": null,
                            "userType": 1,
                            "bounds": "POLYGON((39.98159531503916 54.30483614292627,39.98121907861113 54.30479998969944,39.981248217820905 54.30469264890723,39.981637030560194 54.3047261453547,39.98159531503916 54.30483614292627))",
                            "lastSyncTime": 1658482270000,
                            "bound_area_size": 308.7880,
                            "updated_time": 1658482270000,
                            "created_time": 1658482270000,
                            "center_lat": 54.304763561090375,
                            "center_lng": 39.98142608133329,
                            "gis_data_url": "https://xfarm-database.oss-cn-hangzhou.aliyuncs.com/db/dservice/x_land/gis_data/8a77f22a-10d6-41a8-8cf2-2d3018202ade?Expires=1703159467&OSSAccessKeyId=LTAI5tHFyoo9Qouf4yaW266f&Signature=ZrDtN9Ur5oJ4ARHsY8itZHpuhlk%3D"
                        }]
                    },
                    "message": "success",
                    "status": 200
                }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async Page(req: Request, res: Response): Promise<void> {
        try {
            // POST https://aerial-survey.xa.com/flightImageParentTaskGroup/page?clientId=5&noise=58774&timestamp=1748587938027&signature=34e62992c0e41d10a923c8f03da6b90fe548d089
            // {
            //     "page": {
            //         "pageIndex": 1,
            //         "pageSize": 100
            //     },
            //     "startCreateTime": 1,
            //     "userId": "A66551855062225AE2D2323124A9A1C5"
            // }
            res.json(
                {
                    "status": 200,
                    "message": null,
                    "data": {
                        "total": 6,
                        "pageIndex": 1,
                        "pageSize": 100,
                        "records": [{
                            "uuid": "62bced02-a5bb-4eae-a983-580585df24c7",
                            "name": "140810_2d2b1c_001",
                            "alias": "62bced02-a5bb-4eae-a983-580585df24c7",
                            "userId": "A66551855062225AE2D2323124A9A1C5",
                            "workRange": "POLYGON ((39.0669214725494 45.1884379567196, 39.0673559904099 45.1892129991466, 39.0685737133026 45.1891789731152, 39.0691316127777 45.1885438167953, 39.07062292099 45.1860522720873, 39.0733909606934 45.1837345461013, 39.0716046094894 45.1828119665982, 39.0679943561554 45.1826191304688, 39.0669214725494 45.1884379567196))",
                            "workArea": 199344.60421096,
                            "shared": "none",
                            "landGuid": null,
                            "createTime": 1713985657451,
                            "taskModel": "",
                            "lastSyncTime": 0,
                            "sourceUuid": null,
                            "config": null
                        }]
                    }
                }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async PageFinish(req: Request, res: Response): Promise<void> {
        try {
            // POST https://aerial-survey.xa.com/flightImageTaskGroup/page?clientId=5&noise=26019&timestamp=1748587940069&signature=256684fc68dbf601852bfd62e05dab54e198ffc8	200	POST	aerial-survey.xa.com	/flightImageTaskGroup/page?clientId=5&noise=26019&timestamp=1748587940069&signature=256684fc68dbf601852bfd62e05dab54e198ffc8	Fri May 30 09:52:17 MSK 2025	PT0.265S	4768	Complete	
            // {
            //     "page": {
            //         "pageIndex": 1,
            //         "pageSize": 100
            //     },
            //     "startCreateTime": 1,
            //     "userId": "A66551855062225AE2D2323124A9A1C5"
            // }
            res.json(
                {
                    "status": 200,
                    "message": null,
                    "data": {
                        "total": 6,
                        "pageIndex": 1,
                        "pageSize": 100,
                        "records": [{
                            "uuid": "27ffbbbc-9cb1-46b2-a086-11f8a5e61206",
                            "name": "140810_2d2b1c_001",
                            "alias": "27ffbbbc-9cb1-46b2-a086-11f8a5e61206",
                            "userId": "A66551855062225AE2D2323124A9A1C5",
                            "workRange": "POLYGON ((39.0669214725494 45.1884379567196, 39.0673559904099 45.1892129991466, 39.0685737133026 45.1891789731152, 39.0691316127777 45.1885438167953, 39.07062292099 45.1860522720873, 39.0733909606934 45.1837345461013, 39.0716046094894 45.1828119665982, 39.0679943561554 45.1826191304688, 39.0669214725494 45.1884379567196))",
                            "workTime": 1657630688000,
                            "workArea": 199344.60421096,
                            "status": "taskFinish",
                            "shared": "none",
                            "landGuid": null,
                            "createTime": 1713985657459,
                            "parentUuid": "62bced02-a5bb-4eae-a983-580585df24c7",
                            "fromShare": false,
                            "taskModel": "",
                            "lastSyncTime": 0,
                            "config": null,
                            "canShare": true
                        }]
                    }
                }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async lntOrCloud(req: Request, res: Response): Promise<void> {
        try {
            // GET ?clientId=5&noise=44693&timestamp=1748587936700&signature=4174763df22ce035f20113da41bcfab2980a5149	
           res.json(
                {
                    "status": 200,
                    "message": null,
                    "data": "cloud"
                }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async PageTaskFinish(req: Request, res: Response): Promise<void> {
        try {
            // POST https://aerial-survey.xa.com/flightImageTask/page?clientId=5&noise=811&timestamp=1748587941843&signature=9e2238818bfb5b06049e95bdb41767871d4efea8	200	POST	aerial-survey.xa.com	/flightImageTask/page?clientId=5&noise=811&timestamp=1748587941843&signature=9e2238818bfb5b06049e95bdb41767871d4efea8	Fri May 30 09:52:19 MSK 2025	PT0.262S	8923	Complete	
            // {
            //     "page": {
            //         "pageIndex": 1,
            //         "pageSize": 100
            //     },
            //     "startCreateTime": 1,
            //     "userId": "A66551855062225AE2D2323124A9A1C5"
            // }
            res.json(
                {
                    "status": 200,
                    "message": null,
                    "data": {
                        "total": 6,
                        "pageIndex": 1,
                        "pageSize": 100,
                        "records": [{
                            "uuid": "e0d4e7fe-f169-4142-a1ce-4c2ad7e5ea58",
                            "name": "140810_cc4447_001",
                            "userId": "A66551855062225AE2D2323124A9A1C5",
                            "sn": null,
                            "workPath": "POLYGON ((39.0678656 45.1863471, 39.0687561 45.1878519, 39.0696036 45.1864908, 39.0718138 45.1836324, 39.0688419 45.1834131, 39.0678656 45.1863471))",
                            "workRange": "POLYGON ((39.0678656 45.1863471, 39.0687561 45.1878519, 39.0696036 45.1864908, 39.0718138 45.1836324, 39.0688419 45.1834131, 39.0678656 45.1863471))",
                            "workArea": 72961.1496558391,
                            "workTime": 1659019347000,
                            "status": "taskFinish",
                            "uavInfo": null,
                            "dataStatus": {
                                "aerialImage": false,
                                "dom": true,
                                "obstacles": false,
                                "tree": false,
                                "land": false,
                                "pointCloud": true
                            },
                            "thumbnailKey": null,
                            "thumbnailUrl": null,
                            "shared": "none",
                            "modal": "field",
                            "createTime": 1659085933208,
                            "updateTime": null,
                            "groupId": "6fbcb6d6-dbff-457c-ad34-a746c0333cc7",
                            "landGuid": null,
                            "deviceId": null,
                            "parentUuid": null,
                            "type": 0,
                            "deleted": false,
                            "fromShare": false,
                            "importTaskUuid": null,
                            "actualRange": null,
                            "dom": false,
                            "pointCloud": false,
                            "dsmWebp": false,
                            "taskModel": "",
                            "lastSyncTime": 0,
                            "aerialUuid": null,
                            "importTaskHolder": null,
                            "workName": null,
                            "config": null,
                            "canShare": true,
                            "enable_use": null,
                            "enable_download": null
                        }]
                    }
                }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async deletedLand(req: Request, res: Response): Promise<void> {
        try {
            // GET https://dservice.xa.com/api/land/v1/deleted/guid/list?timestamp=1748587940969
           res.json(
            {
                "success": true,
                "data": {
                    "list": [],
                    "current_time": 1748587941195
                },
                "message": "success",
                "status": 200
            }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async deletedPrescription(req: Request, res: Response): Promise<void> {
        try {
            // GET https://dservice.xa.com/api/work/v1/prescription/deleted/guid/list?timestamp=0
           res.json(
            {
                "success": true,
                "data": {
                    "list": [],
                    "current_time": 1748587966123
                },
                "message": "success",
                "status": 200
            }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async prescriptionList(req: Request, res: Response): Promise<void> {
        try {
            // GET https://dservice.xa.com/api/work/v1/prescription/deleted/guid/list?timestamp=0
           res.json(
            {
                "success": true,
                "data": {
                    "records": [{
                        "id": 1433,
                        "source": "MANUAL",
                        "prescriptionName": "203db34d-9544-4626-876b-8ba037768a3f",
                        "prescriptionProtoUrl": "https://xfarm-database.oss-cn-hangzhou.aliyuncs.com/db/dservice/xfarm_prescription/data/203db34d-9544-4626-876b-8ba037768a3f",
                        "prescriptionImgUrl": "",
                        "userGuid": "A66551855062225AE2D2323124A9A1C5",
                        "landGuid": null,
                        "minExtentValue": null,
                        "maxExtentValue": null,
                        "sn": null,
                        "dataType": null,
                        "prescriptionType": null,
                        "status": 1,
                        "createdAt": 1714028818000,
                        "updatedAt": 1714028818000,
                        "teamId": "",
                        "workType": null,
                        "workConfigUrl": null,
                        "lastSyncTime": null,
                        "workConfig": null,
                        "prescriptionBorder": "POLYGON((39.00442051451742 45.12589370049751,39.00569222463554 45.12583156648154,39.00577431859858 45.12697840207598,39.00475784607454 45.12700367642996,39.00442051451742 45.12589370049751))",
                        "prescriptionGuid": "203db34d-9544-4626-876b-8ba037768a3f",
                        "lands": [{
                            "landName": null,
                            "landAreaMu": null,
                            "landArea": null,
                            "landGuid": "0739d35c-fa30-419e-847f-bd5eb2e2c570",
                            "landBorderVersion": null
                        }]
                    }],
                    "total": 5,
                    "size": 10,
                    "current": 1,
                    "orders": [],
                    "searchCount": true,
                    "pages": 1
                },
                "message": "success",
                "status": 200
            }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async getLandDetail(req: Request, res: Response): Promise<void> {
        try {
            // GET https://dservice.xa.com/api/land/v1/detail?landGuid=120f425f-aebb-4991-8631-a2a4551192a8
           res.json(
            {
                "success": true,
                "data": {
                    "id": 13751879,
                    "guid": "120f425f-aebb-4991-8631-a2a4551192a8",
                    "name": "aero",
                    "md5": "9e81be882f8ae56f4eaf4bbb2a64b9b7",
                    "remark": "",
                    "teamGuid": "",
                    "groupGuid": "",
                    "userType": 1,
                    "groupName": null,
                    "bounds": "POLYGON((37.66571538462213 53.54128550193687,37.66357261551454 53.540742146459195,37.66269845430753 53.54003107497211,37.66251691470754 53.53915954943042,37.66210756070751 53.53856512487397,37.66147395190748 53.5379453067507,37.660719316707485 53.537329710486425,37.65848343211769 53.53555631936287,37.65807504360262 53.5353080873629,37.65860966129503 53.53516135398522,37.65984009550746 53.534833386475945,37.66046302550748 53.53451181539457,37.661028956278216 53.53407294209193,37.66150573260768 53.533844313845556,37.66204210597829 53.53363178507283,37.662244616494064 53.53295305552317,37.663253694818565 53.532228683641534,37.66381995430547 53.5318280610736,37.66412724854689 53.53143592992203,37.664264732518404 53.531313302094354,37.66451081325269 53.53125579417198,37.66527083961421 53.53122483326277,37.666039926619334 53.531229449360275,37.66637654774763 53.531348676763784,37.66768587665075 53.53200870022309,37.669009411654145 53.53309511302417,37.66971571484592 53.53374495915786,37.67055868940153 53.53457334995172,37.67069326348005 53.53468665825259,37.67095119713056 53.53480063276698,37.67119006611995 53.53477597164075,37.67162518048528 53.534921590180424,37.672863950792674 53.53529056916646,37.67370099413526 53.53547380931399,37.67391294830895 53.535597779273516,37.67291008994309 53.53712160679737,37.672431163449545 53.53783424291146,37.67198631883025 53.53836785223717,37.67178530825706 53.53851323130071,37.670847332418305 53.53856170279051,37.6706368469566 53.53837407090876,37.670492138201666 53.53813796627602,37.67015907586318 53.53806697501617,37.66957126430668 53.53801991346588,37.66927132252371 53.537844006350056,37.669408138073834 53.53746795357558,37.66938382843486 53.53725308624107,37.669089679766415 53.53713788049531,37.66889676912385 53.53739937189621,37.66677148353372 53.54006170362461,37.66571538462213 53.54128550193687))",
                    "lastSyncTime": 1697177184399,
                    "styleGuid": null,
                    "color": null,
                    "colorExtend": null,
                    "bound_area_size": 586593.4921,
                    "image_list": [],
                    "updated_time": 1746050506853,
                    "center_lng": 37.6659088713672,
                    "center_lat": 53.53601639327531,
                    "tag_list": [],
                    "crop_list": [],
                    "gis_data": {
                        "records": [],
                        "obstacles": [],
                        "accuracy": 0,
                        "source": 1,
                        "bounds_area_size": 586593.4921018485,
                        "type": 1,
                        "version": 7,
                        "extends": {
                            "source_map_layer": 33,
                            "modify_at": 1697177187691
                        },
                        "nosprays": [],
                        "bounds": [{
                            "extends": {
                                "area_size": 586593.4921018485
                            },
                            "name": "",
                            "id": 0,
                            "type": 2,
                            "points": [{
                                "create_by": "A66551855062225AE2D2323124A9A1C5",
                                "rover_accuracy_type": 0,
                                "lng": 37.66571538462213,
                                "alt": 0,
                                "accuracy": 0,
                                "rover_type": 0,
                                "rover_mode": 0,
                                "source": 1,
                                "create_at": 1696763608362,
                                "lat": 53.54128550193687
                            }]
                        }],
                        "name": "aero",
                        "guid": "120f425f-aebb-4991-8631-a2a4551192a8",
                        "accuracy_type": 0,
                        "id": 0,
                        "create_at": 1696591430528,
                        "markers": [],
                        "user_uid": "A66551855062225AE2D2323124A9A1C5"
                    },
                    "obstacle_area_size": null,
                    "created_at": 1696591430000,
                    "updated_at": 1746050506853,
                    "address": "Russia/Tula Oblast/Tyoplo Ogaryovsky District",
                    "created_by": "A66551855062225AE2D2323124A9A1C5",
                    "gis_data_url": "https://xfarm-database.oss-cn-hangzhou.aliyuncs.com/db/dservice/x_land/gis_data/120f425f-aebb-4991-8631-a2a4551192a8?Expires=1748591542&OSSAccessKeyId=LTAI5tHFyoo9Qouf4yaW266f&Signature=bxigZfFr4rkGYcY1uWOklG3Sbg0%3D"
                },
                "message": "success",
                "status": 200
            }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }

    static async getDetail(req: Request, res: Response): Promise<void> {
        try {
            // GET https://dservice.xa.com/api/land/v1/route/getDetail?guid=88B84617462F9328A7980627A82FB1F3	
           res.json(
            {
                "success": true,
                "data": {
                    "guid": null,
                    "name": null,
                    "landGuid": null,
                    "teamGuid": null,
                    "type": null,
                    "createdTime": null,
                    "updatedTime": null,
                    "landName": null,
                    "lastSyncTime": null,
                    "gis_data": {
                        "land_uid": "736bc0f0-ea27-4c54-81f8-7fb480200b56",
                        "references": [{
                            "extends": {
                                "length": 29.649112825247336
                            },
                            "name": "",
                            "id": 1,
                            "type": 0,
                            "points": [{
                                "create_by": "A66551855062225AE2D2323124A9A1C5",
                                "lng": 39.00490749364778,
                                "basepoint": {
                                    "bs_id": 0,
                                    "lng": 39.005075777244365,
                                    "base_id": 0,
                                    "alt": 47.63047893917395,
                                    "accuracy": 0,
                                    "lat": 45.125694182074874
                                },
                                "alt": 47.89335244104266,
                                "source": 2,
                                "create_at": 1656953114498,
                                "lat": 45.12570076864274
                            }]
                        }],
                        "extends": {},
                        "name": "moika2-自由航线",
                        "update_at": 0,
                        "guid": "88B84617462F9328A7980627A82FB1F3",
                        "source": 2,
                        "create_at": "1657634506119000",
                        "type": 3,
                        "version": 1,
                        "user_uid": "A66551855062225AE2D2323124A9A1C5",
                        "option": {
                            "spray_width": 3,
                            "angle": 0,
                            "obstacle_safe_distance": 1.5,
                            "bound_safe_distance": 1.5
                        }
                    }
                },
                "message": "success",
                "status": 200
            }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async FlightPage(req: Request, res: Response): Promise<void> {
        try {
           // POST https://aerial-survey.xa.com/flightImageParentTask/page?clientId=5&noise=39930&timestamp=1748587937511&signature=8fecc07251d6b32479403a0445e3b9667c0611c2	200	POST	aerial-survey.xa.com	/flightImageParentTask/page?clientId=5&noise=39930&timestamp=1748587937511&signature=8fecc07251d6b32479403a0445e3b9667c0611c2	Fri May 30 09:52:15 MSK 2025	PT0.25S	494	Complete	

            // {
            //     "page": {
            //         "pageIndex": 1,
            //         "pageSize": 100
            //     },
            //     "startCreateTime": 1,
            //     "userId": "A66551855062225AE2D2323124A9A1C5"
            // }
            res.json(
                {
                    "status": 200,
                    "message": null,
                    "data": {
                        "total": 0,
                        "pageIndex": 1,
                        "pageSize": 100,
                        "records": []
                    }
                }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async lists(req: Request, res: Response): Promise<void> {
        try {
            // GET https://dservice.xa.com/api/land/v1/tag/lists?updatedTime=0&guid=0&pageSize=30
           res.json(
            {
                "success": true,
                "data": {
                    "list": [{
                        "id": 115718,
                        "guid": "62adbab1-55ab-4c30-aad5-a4a9577d0d34",
                        "name": "ZM",
                        "updated_time": 1657662178000,
                        "last_sync_time": 0
                    }]
                },
                "message": "success",
                "status": 200
            }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async listByCondition(req: Request, res: Response): Promise<void> {
        try {
            // POST https://dservice.xa.com/api/work/v1/recordShow/listByCondition	
            // {
            //     "landGuid": "29a845e4-b257-4bf5-bbe6-dc6704614204",
            //     "limit": 500
            // }
            res.json(
                {
                    "success": true,
                    "data": [{
                        "id": 43370039,
                        "userGuid": "A66551855062225AE2D2323124A9A1C5",
                        "userName": null,
                        "guid": "ca836f5bbbb841bcae0ac3c9640c7c3d",
                        "name": "95\uD83C\uDF3B Серафим",
                        "dataType": 1,
                        "landCount": 1,
                        "teamGuid": "",
                        "startTime": 1726686607,
                        "endTime": 1726711915,
                        "completeAreaSize": 748628.75,
                        "totalSpray": 600319.4132176444,
                        "totalBroadcast": 0.0,
                        "workTime": 11793.641,
                        "workModel": 0,
                        "workPoints": 0,
                        "pointTaskCount": 0
                    }, {
                        "id": 43370028,
                        "userGuid": "A66551855062225AE2D2323124A9A1C5",
                        "userName": null,
                        "guid": "3dbb4defbc754ae39d3839bb70cebf41",
                        "name": "95\uD83C\uDF3B Серафим",
                        "dataType": 1,
                        "landCount": 1,
                        "teamGuid": "",
                        "startTime": 1726682734,
                        "endTime": 1726686103,
                        "completeAreaSize": 167337.13,
                        "totalSpray": 134186.30755381047,
                        "totalBroadcast": 0.0,
                        "workTime": 2357.281,
                        "workModel": 0,
                        "workPoints": 0,
                        "pointTaskCount": 0
                    }],
                    "message": "success",
                    "status": 200
                }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async getRoutesList(req: Request, res: Response): Promise<void> {
        try {
            // GET https://dservice.xa.com/api/land/v1/route/getRoutesList?updatedTime=0&guid=0&pageSize=500
            res.json(
                {
                    "success": true,
                    "data": {
                        "lists": [{
                            "guid": "88B84617462F9328A7980627A82FB1F3",
                            "name": "moika2-自由航线",
                            "landGuid": "736bc0f0-ea27-4c54-81f8-7fb480200b56",
                            "teamGuid": "",
                            "type": 3,
                            "createdTime": 1210109319000,
                            "updatedTime": 1210109319000,
                            "landName": "",
                            "lastSyncTime": 0,
                            "gis_data": null
                        }],
                        "count": 119,
                        "deletedGuids": ["9dc14ab1dc104e94a17ac4bc0fbbf2be"]
                    },
                    "message": "success",
                    "status": 200
                }
            );
        } catch (error) {
            console.log('Device list error:', error);
            res.status(500).json({
                message: `${error}`,
                status: 500,
            });
        }
    }
    static async groupListAll(req: Request, res: Response): Promise<void> {
        try {
            // GET https://dservice.xa.com/api/land/v1/group/list/all
            res.json(
                {
                    "success": true,
                    "data": {
                        "list": [{
                            "status": 1,
                            "name": "1",
                            "guid": "d1399e33-f54d-4018-bebd-f19ea943feb3",
                            "landList": [],
                            "created_time": 1747318436200,
                            "updated_time": 1747318544071,
                            "user_guid": "A66551855062225AE2D2323124A9A1C5",
                            "land_area_sum": null,
                            "land_count": 0,
                            "min_lat": null,
                            "max_lat": null,
                            "max_lng": null,
                            "min_lng": null,
                            "last_sync_time": 1747318436317
                        }]
                    },
                    "message": "success",
                    "status": 200
                }
            );
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
            
            if (!serial_number) {
                res.status(400).json({ 
                    status: 400, 
                    message: "serial_number is required" 
                });
                return;
            }

            // Forward request to another server
            const headers = { ...req.headers };
            const result = await ExternalApiService.RedirectSearch('/api/equipment/device/searchInfo', headers, req.query)
            
            // Modify new_link field to true
            if (result.data) {
                result.data.new_link = true;
                // Store the result in cache
                deviceStatusCache[serial_number.toString()] = result.data;
            }

            res.json(result);

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

            res.json(result);

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

