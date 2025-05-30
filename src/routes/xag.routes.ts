import { Router } from 'express';
import { AuthController, XagController } from '../controllers';

const router = Router();

router.post('api/account/v1/user/token/login', AuthController.Login);
router.get('api/account/v1/common/user/setting/get', AuthController.Setting);
router.post('api/message/v1/jpush/relation/register', AuthController.Register);
router.get('api/equipment/device/lists', XagController.getDeviceLists);
router.get('api/equipment/device/searchInfo', XagController.searchInfo);
router.get('api/equipment/device/searchStatus', XagController.searchStatus);
router.post('api/equipment/device/create', XagController.create);
router.get('api/account/v1/common/user/route', AuthController.Route);
router.get('api/noflyzone/api/get_paging', AuthController.GetPaging);
router.post('api/equipment/home/delete', XagController.Delete);
router.get('api/equipment/home/getIotUserSession', AuthController.getIotSession);
router.post('api/land/v1/resume/work/list', XagController.WorkList);
router.get('api/land/v1/route/initAllRoute', XagController.InitAllRoutes);
router.get('api/land/v1/cloud/authority', XagController.Authority);
router.get('api/land/v1/count', XagController.Count);
router.get('api/land/v1/route/getRoutesList', XagController.getRoutesList);
router.get('api/land/v1/group/list/all', XagController.groupListAll);
router.get('flag/lntOrCloud', XagController.lntOrCloud);
router.get('api/land/v1/tag/lists', XagController.lists);
router.post('flightImageParentTask/page', XagController.FlightPage);
router.get('api/land/v1/initAllLand', XagController.InitAllLand);
router.get('flightImageParentTaskGroup/deleted/list', XagController.deleted);
router.get('api/land/v1/deleted/guid/list', XagController.deletedLand);
router.post('flightImageParentTaskGroup/page', XagController.Page);
router.post('flightImageTaskGroup/page', XagController.PageFinish);
router.post('flightImageTask/page', XagController.PageTaskFinish);
router.get('api/land/v1/myLand/pageByGuid', XagController.pageByGuid);
router.get('api/land/v1/route/getDetail', XagController.getDetail);
router.get('api/land/v1/detail', XagController.getLandDetail);
router.get('api/work/v1/prescription/deleted/guid/list', XagController.deletedPrescription);
router.get('api/work/v1/prescription/list', XagController.prescriptionList);
router.post('flightImageParentTask/page', XagController.FlightPage);
router.post('api/work/v1/recordShow/listByCondition', XagController.listByCondition);

export default router;

