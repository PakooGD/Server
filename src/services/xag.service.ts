// src/services/xag.service.ts
import { User } from '../models/user.model';
import { Device } from '../models/device.model';
import axios, { AxiosError } from 'axios';
import { TokenService } from './token.service';
import { ExternalApiService } from './'

export class XagService {
  static async getDeviceLists(headers: any) {
    try {
      const token = headers.token;
      const user = await User.findOne({ where: { token } });

      if (!user) {
        throw new Error('User not found');
      }

      if (!TokenService.verifyToken(user.expire_in)) {
        // Try to refresh the token
        const result = await TokenService.refreshToken(user.refresh_token_expire_in);
        if (result != null) {
          // Update the user with the new token information
          await user.update({
            access_token: result.access_token,
            refresh_token: result.refresh_token,
            expire_in: result.expire_in,
            refresh_token_expire_in: result.refresh_token_expire_in,
          });
        } else {
          return {
            status: 401,
            message: 'Token expired and refresh failed',
            data: null,
          };
        }
      }

      const devices = await Device.findAll({
        where: { user_id: user.id },
      });

      if (devices && devices.length > 0) {
        return {
          status: 200,
          message: 'Devices found for user',
          data: {
            lists: devices.map(device => {
              const deviceData = device.get({ plain: true });
              delete deviceData.user_id; // Remove user_id
              return deviceData;
            })
          },
        };
      }

      const response = await ExternalApiService.GetDeviceLists(headers)
  
      if (!response || !response.data) {
        throw new Error('Invalid API response structure');
      }
      
      const deviceLists = response.data.data?.lists;
      if (!Array.isArray(deviceLists)) {
        return {
          status: 200,
          message: 'No devices available',
          data: null
        };
      }

      if (response.data.data?.lists) {
        await Promise.all(
          deviceLists.map(async (deviceData: any) => {
            try {
              await Device.upsert({
                ...deviceData,
                user_id: user.id,
              });
            } catch (upsertError) {
              console.error('Failed to upsert device:', upsertError);
            }
          })
        );

        // Fetch devices again after upsert and remove user_id
        const updatedDevices = await Device.findAll({
          where: { user_id: user.id },
        });

        return {
          status: 200,
          message: 'Devices found for user',
          data: {
            lists: updatedDevices.map(device => {
              const deviceData = device.get({ plain: true });
              delete deviceData.user_id; // Remove user_id
              return deviceData;
            })
          },
        };
      }

      return response.data
    } catch (error) {
      console.error('getting devices error:', error);
      throw new Error('Failed to get devices');
    }
  }

  static async forwardRequest(endpoint: string, headers: any, params: any): Promise<any> {
    try {
      const response = await axios.get(`https://dservice.xa.com${endpoint}`, {
        headers: {
          ...headers,
          host: 'dservice.xa.com'
        },
        params
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Forward request error:', error.response?.data);
        throw {
          status: error.response?.status || 500,
          message: error.response?.data?.message || 'Failed to forward request',
          data: error.response?.data
        };
      }
      throw {
        status: 500,
        message: error instanceof Error ? error.message : 'Internal server error',
        data: null
      };
    }
  }

  static async Delete(headers: any, serial_number:any) {
    try {
      const token = headers.token;
      const user = await User.findOne({ where: { token } });
      if (!user) {
        throw new Error('User not found');
      }

      if (!TokenService.verifyToken(user.expire_in)) {
        const result = await TokenService.refreshToken(user.refresh_token_expire_in);
        if (result != null) {
          // Update the user with the new token information
          await user.update({
            access_token: result.access_token,
            refresh_token: result.refresh_token,
            expire_in: result.expire_in,
            refresh_token_expire_in: result.refresh_token_expire_in,
          });
        } else {
          return {
            status: 401,
            message: 'Token expired and refresh failed',
          };
        }
      }

      const device = await Device.findOne({
          where: {
              serial_number: serial_number,
              user_id: user.id
          }
      });

      if (!device) throw new Error('Device not found');

      await device.destroy();

      return {
          status: 200,
          message: 'Device successfully deleted',
      };

    } catch (error) {
      console.error('Deleting device error:', error);
      throw new Error('Failed to delete device');
    }
  }

  static async SearchInfo(headers: any, params: any): Promise<any> {
    try {
      const response = await ExternalApiService.SearchInfo(headers,params)
      return response.data;
    } catch (error) {
      console.error('SearchInfo error:', error);
      throw new Error('Failed to SearchInfo');
    }
  }

  static async SearchStatus(headers: any, params: any): Promise<any> {
    try {
      const response = await ExternalApiService.SearchStatus(headers,params)   
      return response.data;
    } catch (error) {
      console.error('SearchStatus error:', error);
      throw new Error('Failed to SearchStatus');
    }
  }

  static async createDevice(userId: number, deviceData: any): Promise<Device> {
    try {
      const device = await Device.create({
        serial_number: deviceData.serial_number,
        name: deviceData.name,
        dev_id: "4A0040000551303438393030", // Can be generated or from request
        model: "ACS2_21",
        model_name: "ACS2 2021",
        country_code: "",
        user_id: userId,
        authentication_info: deviceData.authentication_info,
        bind_time: deviceData.bind_time,
        lat: deviceData.lat,
        lng: deviceData.lng,
        secret: deviceData.secret
      });

      return device;
    } catch (error) {
      console.error('Create device error:', error);
      throw new Error('Failed to create device');
    }
  }

}
