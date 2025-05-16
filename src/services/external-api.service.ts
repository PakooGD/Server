import axios from 'axios';
import { LoginResponse } from '../types/ITypes';

const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });

export class ExternalApiService {
  static async login(headers:any, phone: string, password: string, icc: string): Promise<LoginResponse> {
    const response = await axios.post(`https://passport.xag.cn/api/account/v1/user/token/login`, {
      phone,
      password,
      icc,
    }, {
      headers: headers,
      httpsAgent: agent, 
      timeout: 30000,
    });
    return response.data;
  }

  static async register(headers:any, alias:any, app:any, app_id:any, platform:any, registration_id:any, tags:any, version:any): Promise<any> {
    const response = await axios.post(`https://message.xa.com/api/message/v1/jpush/relation/register`, {
      alias,
      app,
      app_id,
      platform,
      registration_id,
      tags,
      version
    }, {
      headers: headers,
      httpsAgent: agent, 
      timeout: 30000,
    });
    return response.data;
  }

  static async getUserSettings(headers:any): Promise<any> {
    return await axios.post(`https://passport.xag.cn/api/account/v1/common/user/setting/get`, {
      headers: headers,
      httpsAgent: agent, 
      timeout: 30000,
    });
  }

  static async Route(headers:any,accountKey:any): Promise<any> {
    return await axios.get(`https://passport.xag.cn/api/account/v1/common/user/route?account_key=${accountKey}`, {
      headers: headers,
      httpsAgent: agent, 
      timeout: 30000,
    });
  }

  static async GetDeviceLists(headers:any): Promise<any> {
    return await axios.get('https://dservice.xa.com/api/equipment/device/lists', {
      headers: headers,
      httpsAgent: agent, 
      timeout: 30000,
    });
  }

  static async SearchInfo(headers:any, params:any): Promise<any> {
    return await axios.get('`https://dservice.xa.com/api/equipment/device/searchInfo', {
      headers: {
        ...headers,
        host: 'dservice.xa.com'
      },
      params,
      httpsAgent: agent, 
      timeout: 30000,
    });
  }  
  
  static async SearchStatus(headers:any, params:any): Promise<any> {
    return await axios.get('https://dservice.xa.com/api/equipment/device/searchStatus', {
      headers: {
        ...headers,
        host: 'dservice.xa.com'
      },
      params,
      httpsAgent: agent, 
      timeout: 30000,
    });
  }

}