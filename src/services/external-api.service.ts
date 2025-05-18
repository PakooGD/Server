import axios from 'axios';
import { LoginResponse } from '../types/ITypes';

export class ExternalApiService {
  static async login(headers:any, phone: string, password: string, icc: string): Promise<LoginResponse> {
    const response = await axios.post(
      `https://passport.xag.cn/api/account/v1/user/token/login`, 
      { phone, password, icc }, 
      { 
        headers: {
          ...headers,
          host: 'passport.xag.cn'
        }
      }
    );
    return response.data;
  }

  static async register(logingData: any): Promise<any> {
    const { headers, alias, app, app_id, platform, registration_id, tags, version } = logingData;
    const response = await axios.post(
      `https://message.xa.com/api/message/v1/jpush/relation/register`,
      { alias, app, app_id, platform, registration_id, tags, version },
      { 
        headers: {
          ...headers,
          host: 'message.xa.com'
        }
      }
    );
    return response.data;
  }

  static async getUserSettings(headers:any): Promise<any> {
    const response = await axios.post(
      `https://passport.xag.cn/api/account/v1/common/user/setting/get`, 
      { 
        headers: {
          ...headers,
          host: 'passport.xag.cn'
        }
      }
    );
    return response.data;
  }

  static async Route(headers:any,accountKey:any): Promise<any> {
    const response = await axios.get(
      `https://passport.xag.cn/api/account/v1/common/user/route?account_key=${accountKey}`, 
      { 
        headers: {
          ...headers,
          host: 'passport.xag.cn'
        }
      }
    );
    return response.data;
  }

  static async GetDeviceLists(headers:any): Promise<any> {
    const response = await axios.get(
      'https://dservice.xa.com/api/equipment/device/lists', 
      { 
        headers: {
          ...headers,
          host: 'dservice.xa.com'
        }
      }
    );
    return response.data;
  }

  static async RedirectSearch(endpoint:string, headers:any,params:any): Promise<any> {
    const response = await axios.get(
      `https://dservice.xa.com${endpoint}`, 
      { 
        headers: {
          ...headers,
          host: 'dservice.xa.com'
        },
        params
      }
    );
    return response.data;
  }
}