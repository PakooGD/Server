// src/services/xag.service.ts
import { User } from '../models/user.model';
import { Device } from '../models/device.model';
import { TokenService } from './token.service';
import { ExternalApiService } from '.'

export class RecordService {
  static async SearchInfo(req: any): Promise<any> {
    try {
      const result = await ExternalApiService.RedirectGet(
        req, 
        'dservice.xa.com',
        '/api/equipment/device/searchInfo'
      );

      return result;
    } catch (error) {
      throw new Error(`Failed: ${error}`);
    }
  }
}







