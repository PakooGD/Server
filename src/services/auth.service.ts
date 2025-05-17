import { User } from '../models/user.model';
import axios from 'axios';
import { ExternalApiService } from './';
import { Op } from 'sequelize';
import { LoginData } from '../types/ITypes';
import { TokenService } from './token.service';
import { error } from 'console';
import { whitelist } from 'validator';

const bcrypt = require('bcrypt');

const accountKeys: Record<string, any> = {};

export class AuthService {
  private static formatUserResponse(user: User) {
    return {
      id: user.id,
      guid: user.guid,
      name: user.name,
      nickname: user.nickname,
      icc: user.icc,
      mobile: user.mobile,
      phone: user.phone,
      intro: user.intro,
      username: user.username,
      token: user.token,
      access_token: user.access_token,
      expire_in: user.expire_in,
      refresh_token: user.refresh_token,
      refresh_token_expire_in: user.refresh_token_expire_in,
      identity: user.identity,
      wechat_bind: user.wechat_bind,
      real_name: user.real_name,
      gender: user.gender,
      avatar: user.avatar,
      area: user.area,
      level: user.level,
      language: user.language,
      country_code: user.country_code,
    };
  }

  static async login(headers: any, loginData: LoginData) {
      const { phone, password, icc } = loginData;
        
      const existingUser = await User.findOne({
          where: {
              [Op.or]: [
                  { phone },
                  { mobile: phone },
              ],
          },
      });
  
      if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
          return {
              data: null,
              message: 'Invalid password',
              status: 401,
          };
        }
        return {
            data: this.formatUserResponse(existingUser),
            message: 'success',
            status: 200,
        };
      }
  
      try {
          const loginResponse = await ExternalApiService.login(headers, phone, password, icc);
  
          if (loginResponse.status === 200) {
              const userData = loginResponse.data;
              
              const hashedPassword = await bcrypt.hash(password, 10);
              
              await User.create({
                  whitelist: false,
                  guid: userData.guid,
                  account_key: accountKeys[userData.guid] || 245,
                  name: userData.name,
                  nickname: userData.nickname,
                  icc: userData.icc,
                  mobile: userData.mobile,
                  phone: userData.phone,
                  intro: userData.intro,
                  username: userData.username,
                  token: userData.token,
                  access_token: userData.access_token,
                  expire_in: userData.expire_in,
                  refresh_token: userData.refresh_token,
                  refresh_token_expire_in: userData.refresh_token_expire_in,
                  identity: userData.identity,
                  wechat_bind: userData.wechat_bind,
                  real_name: userData.real_name,
                  gender: userData.gender,
                  avatar: userData.avatar,
                  area: userData.area,
                  level: userData.level,
                  language: userData.language,
                  country_code: userData.country_code,
                  password: hashedPassword, 
              });

              delete accountKeys[userData.guid];
          }
          return loginResponse;
      } catch (error) {
          console.error('External API login error:', error);
          return {
              data: null,
              message: 'Failed to authenticate with external service',
              status: 500,
          };
      }
  }

  static async register(loginData: any) {
    try {

        const existingUser = await User.findOne({
          where: {
              [Op.or]: [
                  { token: loginData.headers.token },
              ],
          },
        });

        if (existingUser) {
            if(!TokenService.verifyToken(existingUser.expire_in)){
              const result = await TokenService.refreshToken(existingUser.refresh_token_expire_in)
              if(result != null){
                await existingUser.update({
                  access_token: result.access_token,
                  refresh_token: result.refresh_token,
                  expire_in: result.expire_in,
                  refresh_token_expire_in: result.refresh_token_expire_in,
                });
              } 
            }
            return {
              "success": false,
              "data": null,
              "message": "注册id不能为空",
              "status": 1017
            };
        }

      return await ExternalApiService.register(
        loginData.headers,
        loginData.alias,
        loginData.app,
        loginData.app_id,
        loginData.platform,
        loginData.registration_id,
        loginData.tags,
        loginData.version
      );
    } catch (error) {
      console.error('External API registration error:', error);
      return {
        data: null,
        message: 'Failed to register with external service',
        status: 500,
      };
    }
  }

  static async getUserSettings(headers:any) {
    try {
      const existingUser = await User.findOne({
        where: {
            [Op.or]: [
                { token: headers.token },
            ],
        },
      });

      if (existingUser) {
        if(!TokenService.verifyToken(existingUser.expire_in)){
          const result = await TokenService.refreshToken(existingUser.refresh_token_expire_in)
          if(result != null){
            await existingUser.update({
              access_token: result.access_token,
              refresh_token: result.refresh_token,
              expire_in: result.expire_in,
              refresh_token_expire_in: result.refresh_token_expire_in,
            });
          } 
        }
        return {
          "data": null,
          "message": "success",
          "status": 200
        };
    }

      const response = await axios.get('https://passport.xag.cn/api/account/v1/common/user/setting/get', {
        headers
      });
      
      return {
        data: response.data.data,
        message: response.data.message,
        status: response.status,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('XAG Settings Error:', error.response?.data);
        return {
          data: null,
          message: error.response?.data?.message || 'Failed to get XAG user settings',
          status: error.response?.status || 500,
        };
      }
      
      return {
        data: null,
        message: 'Internal server error',
        status: 500
      };
    }
  }

  static async Route(headers:any, query: any) {
    try {
      const accountKey = query.account_key;
      if (!accountKey) {
        return {
          data: null,
          message: 'Account key is required',
          status: 400,
        };
      }

      const existingUser = await User.findOne({
        where: {
          account_key: accountKey,
        },
      });

      if (existingUser) {
        return {
          data: {
            user_guid: existingUser.guid,
            account_key: existingUser.account_key,
            country_code: existingUser.country_code,
            endpoint: existingUser.area,
            is_migrate: false,
            tip_status: 0
          },
          message: "success",
          status: 200
        };
      }

      const response = await ExternalApiService.Route(headers, accountKey);

      accountKeys[response.data.data.user_guid.toString()] = accountKey;

      return {
        data: {
          user_guid: response.data.data.user_guid,
          account_key: response.data.data.account_key,
          country_code: response.data.data.country_code,
          endpoint: response.data.data.endpoint,
          is_migrate: false,
          tip_status: 0
        },
        message: "success",
        status: 200
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('XAG Settings Error:', error.response?.data);
        return {
          data: null,
          message: error.response?.data?.message || 'Failed to get XAG user settings',
          status: error.response?.status || 500,
        };
      }
      console.error('Internal Server Error:', error);
      return {
        data: null,
        message: 'Internal server error',
        status: 500
      };
    }
  }

  static async GetPaging(headers:any) {
    try {
      // const response = await axios.get(``, { headers });

      return {
        message: "No Fly Zones Are Anvailiable.",
        status: 200,
        data: null
      };

      /*
      DATA TYPE
      {
          recordCount: 0,
          pageCount: 0,
          data: [{
            "id": 235,
            "title": "Gu-Lian Airport",
            "transfer": 2,
            "country": "CN",
            "city_name": "Mohe",
            "center": "{\"lat\":52.91700845,\"lng\":122.42307965,\"radius\":4829.625}",
            "shape": "{\"type\":1,\"data\":[{\"lat\":52.89319,\"lng\":122.4494487},{\"lat\":52.8916141,\"lng\":122.4421174},{\"lat\":52.8912361,\"lng\":122.4343602},{\"lat\":52.8920819,\"lng\":122.4267049},{\"lat\":52.8965733,\"lng\":122.4146218},{\"lat\":52.9121948,\"lng\":122.3890928},{\"lat\":52.91594,\"lng\":122.3843964},{\"lat\":52.9202905,\"lng\":122.3814668},{\"lat\":52.9249499,\"lng\":122.3805041},{\"lat\":52.9332593,\"lng\":122.383988},{\"lat\":52.9402537,\"lng\":122.3725436},{\"lat\":52.9478259,\"lng\":122.3853041},{\"lat\":52.9408288,\"lng\":122.3967325},{\"lat\":52.9424061,\"lng\":122.4040713},{\"lat\":52.9427845,\"lng\":122.4118376},{\"lat\":52.9419383,\"lng\":122.4195017},{\"lat\":52.9374392,\"lng\":122.4316026},{\"lat\":52.9218188,\"lng\":122.4571144},{\"lat\":52.918071,\"lng\":122.4618059},{\"lat\":52.9137188,\"lng\":122.464728},{\"lat\":52.9090587,\"lng\":122.4656821},{\"lat\":52.900761,\"lng\":122.4621941},{\"lat\":52.8937657,\"lng\":122.4736157},{\"lat\":52.886191,\"lng\":122.4608754},{\"lat\":52.89319,\"lng\":122.4494487}]}",
            "raw": null,
            "display": 1,
            "type": 1,
            "raw_from": 2,
            "lat": 52.91700845,
            "lng": 122.42307965,
            "radius": 4829
          }],
          version: 0,
        },
      */

    } catch (error) {
      console.error('Internal Server Error:', error);
      return {
        data: null,
        message: 'Internal server error',
        status: 500
      };
    }
  }
}