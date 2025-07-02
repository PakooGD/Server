// src/services/xag.service.ts
import { User } from '../models/user.model';
import { Device } from '../models/device.model';
import { TokenService } from './token.service';
import { ExternalApiService } from '.'
import { Updates } from '../models/';

export class UpdateService {
  static async GetUpdate(req: any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectGet(
          req, 
          'v2.fw.xag.cn',
          'firmware_system_api/v2.2/get_update'
        );
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

  static async CheckUpdate(req: any): Promise<any> {
    try {
      const token = req.headers.token;
      const user = await User.findOne({ where: { token } });
      if (!user) throw new Error(`User is undefinded`);
      
      const updates = await Updates.findOne({ where: {user_id: user.id} });
      if(updates) {

      }

      const result = await ExternalApiService.RedirectGet(
        req, 
        'v2.fw.xag.cn',
        'firmware_system_api/v2.2/check_update/'
      );

      const newUser = await User.create({
          guid: result.data.guid,
      });

      await Updates.create({
        app_list: [{
          app_name: "WLINK",
          app_type: 0,
          app_uuid: "16f7f3a2-3a41-405c-bfe7-0a17dde46ecb",
          app_version_uuid: "502da5a1-0882-4bae-8586-304043d90da7",
          dependence_version_code: 0,
          dependence_version_uuid: "",
          display_name: "Wireless Communication",
          file_md5: "634971878b194281af20a0c236132313",
          file_path: "../firmware_system_api_v2/ota_xpk/com.xa.app.wlink_50463032.xpk",
          file_size: 1675890,
          file_url: "https://app-content.xag.cn/release/firmware_system_admin_v2/app_version/ci7gmv1gqkmoa543nc60.xpk",
          group_name: "Wireless Communication",
          lowest_available_version_code: 0,
          lowest_available_version_uuid: "",
          pkg_name: "com.xa.app.wlink",
          release_note: "1、修复一些已知问题。",
          required: 0,
          update_index: 102,
          version_code: 50463032,
          version_name: "3.2.1.56"
        }],
        channel: "ACS2_21",
        ota_uuid: "ec5c7f8c-8b58-4d2b-8990-9cb8dca76803",
        target_version_code: 0,
        version_code: 0,
        version_name: "1.0.0.2",
        version_type: 4
      });
      
      return {
        code: 200,
        data: {},
        message: ""
      };
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }
}







