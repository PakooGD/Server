import { Router } from 'express';
import { AuthController, DeviceController, MapsController, UpdateController } from '../controllers';

const router = Router();

router.post('api/account/v1/user/token/login', AuthController.Login);
router.get('api/account/v1/common/user/setting/get', AuthController.UserSettings);
router.post('api/message/v1/jpush/relation/register', AuthController.Register);
router.get('api/noflyzone/api/get_paging', AuthController.GetPaging);
router.get('api/equipment/home/getIotUserSession', AuthController.getIotSession);
router.get('api/account/v1/common/user/route', AuthController.Route);

router.get('api/equipment/device/lists', DeviceController.DeviceLists);
router.get('api/equipment/device/searchInfo', DeviceController.SearchInfo);
router.get('api/equipment/device/searchStatus', DeviceController.SearchStatus);
router.post('api/equipment/device/create', DeviceController.CreateDevice);
router.post('api/equipment/home/delete', DeviceController.DeleteDevice);

router.post('api/land/v1/resume/work/list', MapsController.WorkList);
router.get('api/land/v1/route/initAllRoute', MapsController.InitAllRoutes);
router.get('api/land/v1/initAllLand', MapsController.InitAllLand);
router.get('api/land/v1/cloud/authority', MapsController.Authority);
router.get('api/land/v1/deleted/guid/list', MapsController.DeletedLandList);
router.get('flightImageParentTaskGroup/deleted/list', MapsController.DeletedFlightImageParentTaskGroup);
router.get('api/work/v1/prescription/list', MapsController.PrescriptionList);
router.get('api/work/v1/prescription/deleted/guid/list', MapsController.DeletedPrescriptionList);
router.get('api/land/v1/count', MapsController.Count);
router.get('api/land/v1/myLand/pageByGuid', MapsController.PageByGuid);
router.post('flightImageParentTaskGroup/page', MapsController.FlightImageParentTaskGroupPage);
router.post('flightImageTaskGroup/page', MapsController.FlightImageTaskGroupPageFinish);
router.post('flightImageTask/page', MapsController.FlightImageTaskPage);
router.get('flag/lntOrCloud', MapsController.lntOrCloud);
router.get('api/land/v1/route/getDetail', MapsController.Detail);
router.get('api/land/v1/detail', MapsController.LandDetail);
router.get('api/land/v1/tag/lists', MapsController.LandLists);
router.get('api/land/v1/route/getRoutesList', MapsController.RoutesList);
router.get('api/land/v1/group/list/all', MapsController.AllGroupList);


router.post('api/work/v1/recordShow/listByCondition', MapsController.ListByCondition);
router.post('flightImageParentTask/page', MapsController.FlightPage);



router.post('firmware_system_api/v2.2/check_update', UpdateController.checkUpdate);


export default router;

