// src/services/xag.service.ts
import { User } from '../models/user.model';
import { Device } from '../models/device.model';
import { TokenService } from './token.service';
import { ExternalApiService } from './'

export class XagService {
  static async getDeviceLists(headers: any) {
    try {
      const token = headers.token;
      
      const user = await User.findOne({ where: { token } });
      if (!user) throw new Error('User not found');

      TokenService.VerifyAndUpdateUserToken(user)

      // Try find in database
      const devices = await Device.findAll({ where: { user_id: user.id } });
      if (devices && devices.length > 0) {
        const result = {
          "status": 200,
          "message": 'Devices found for user',
          "data": {
            "lists": devices.map(device => {
              const deviceData = device.get({ plain: true });
              delete deviceData.user_id; 
              return deviceData;
            })
          },
        };
        return result
      }

      // Or get from Chinese server
      const result = await ExternalApiService.GetDeviceLists(headers)
      const deviceLists = result.data?.lists;
      if (deviceLists && Array.isArray(deviceLists)) {
        await Promise.all(
          deviceLists.map(async (deviceData: any) => {
             // hardcoded replacement for drone
            await Device.upsert({
              ...deviceData,
              user_id: user.id,
            });
          })
        );
      } 

      return result;
    } catch (error) {
      throw new Error(`Failed to get devices: ${error}`);
    }
  }

  static async RedirectSearch(endpoint: string, headers: any, params: any): Promise<any> {
    try {
      return await ExternalApiService.RedirectSearch(endpoint, headers, params)
    } catch (error) {
      throw new Error(`Failed to fetch info: ${error}`);
    }
  }

  static async Delete(headers: any, serial_number:any) {
    try {
      const token = headers.token;
      const user = await User.findOne({ where: { token } });
      if (!user)  throw new Error('User not found');

      TokenService.VerifyAndUpdateUserToken(user)

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
      throw new Error(`Failed to delete device: ${error}`);
    }
  }

}







