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
router.get('/noflyzone/api/get_paging', AuthController.GetPaging);
router.post('api/equipment/home/delete', XagController.Delete);

export default router;

