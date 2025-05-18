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

      console.log(JSON.stringify(devices))

      if (devices && devices.length > 0) {
        console.log(`Found:${JSON.stringify(devices)}`)
        return {
          status: 200,
          message: 'Devices found for user',
          data: {
            lists: devices.map(device => {
              const deviceData = device.get({ plain: true });
              delete deviceData.user_id; 
              return deviceData;
            })
          },
        };
      }

      const result = await ExternalApiService.GetDeviceLists(headers)
      console.log(JSON.stringify(result))
      if (!result) throw new Error('Invalid API response structure');
      
      const deviceLists = result.data?.lists;

      console.log(JSON.stringify(deviceLists))
      console.log(Array.isArray(deviceLists))
      if (deviceLists && Array.isArray(deviceLists)) {
        await Promise.all(
          deviceLists.map(async (deviceData: any) => {
            try {
              await Device.upsert({
                ...deviceData,
                user_id: user.id,
              });
            } catch (upsertError) {
              console.log('Failed to upsert device:', upsertError)
              console.error('Failed to upsert device:', upsertError);
            }
          })
        );
      } else {
        console.log('No devices available')
        throw new Error('No devices available');
      }
      console.log(JSON.stringify(result))
      return result;
      
    } catch (error) {
      console.error('getting devices error:', error);
      throw new Error('Failed to get devices');
    }
  }

  static async RedirectSearch(endpoint: string, headers: any, params: any): Promise<any> {
    try {
      return await ExternalApiService.RedirectSearch(endpoint, headers, params)

    } catch (error) {
      console.error('Forwarding error:', error);
      throw new Error('Failed to fetch info');
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

}
