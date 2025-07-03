// src/services/xag.service.ts
import { User } from '../models/user.model';
import { Device } from '../models/device.model';
import { TokenService } from './token.service';
import { ExternalApiService } from '.'
import axios from 'axios';

const deviceStatusCache: Record<string, any> = {};

export class DeviceService {
  static async DeviceLists(req: any) {
    try {
      const token = req.headers.token;
      
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
      const result = await ExternalApiService.RedirectGet(
        req, 
        'dservice.xa.com',
        'api/equipment/device/lists'
      );

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

  static async SearchInfo(req: any): Promise<any> {
    try {
      const { serial_number } = req.query; 
      if (!serial_number) throw new Error(`Serial number is required`);

      const params = req.query;
      const headers = {...req.headers};

      const url = `https://dservice.xa.com/api/equipment/device/searchInfo?serial_number=175850124D4X`;
      console.log("Request URL:", url);
      console.log("Headers:", headers);
      console.log("params:", params);
      const response = await axios.get(url, {
        headers: {
          ...headers,
          host: 'dservice.xa.com'
        },
        params,
      });

      console.log(response)
      console.error(response)  
      const result = response.data

      // Modify new_link field to true
      if (result.data) {
        result.data.new_link = true;
        // Store the result in cache
        deviceStatusCache[serial_number.toString()] = result.data;
      }
      return result;
    } catch (error) {

      throw new Error(`Failed: ${error}`);
    }
  }

  static async SearchStatus(req: any): Promise<any> {
    try {
      const { serial_number } = req.query; 
      if (!serial_number) throw new Error(`Serial number is required`);

      const result = await ExternalApiService.RedirectGet(
        req, 
        'dservice.xa.com',
        'api/equipment/device/searchStatus'
      );

      result.data.can_create = true; // hardcoded to add any serial numbers to any accounts

      return result;
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async CreateDevice(req: any): Promise<any> {
    try {
      const requestData = req.body;
      const token = req.headers.token
      const serialNumber = requestData.serial_number;

      const user = await User.findOne({ where: { token } });
      if (!user) throw new Error(`User is undefinded`);

      // Get cached status data
      const statusData = deviceStatusCache[serialNumber] || {};

      // Create device in database with all required fields
      await Device.create({
          serial_number: serialNumber,
          dev_id: statusData.dev_id || "Nothing",
          model: statusData.model || "Nothing",
          model_name: statusData.model_name || "Nothing",
          country_code: statusData.country_code || " ",
          attribution_area: statusData.attribution_area || 1,
          remote_id: statusData.remote_id || " ",
          enroll: statusData.enroll || -1,
          is_lock: statusData.is_lock || false,
          life_state: statusData.life_state || 2,
          share: statusData.share || {
              is_shared: false,
              from_share: false,
              from: " ",
              expire_at: 0
          },
          network_access_license: statusData.network_access_license || [],
          authentication_info: requestData.authentication_info || statusData.authentication_info || {},
          fence_white_list: statusData.fence_white_list || false,
          bind_time: requestData.bind_time || 0,
          lat: requestData.lat || 0,
          lng: requestData.lng || 0,
          name: requestData.name || statusData.name || "Some Name",
          secret: requestData.secret || " ",
          user_id: user.id, // Associate device with user
      });

      // Remove the cached data after creation
      delete deviceStatusCache[serialNumber];

      return {
        status: 200,
        message: "Device created successfully",
      };
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }

  static async DeleteDevice(req: any,) {
    try {
      const { serial_number } = req.body;
      if (!serial_number) throw new Error(`Serial number is required`);

      const token = req.headers.token;
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







