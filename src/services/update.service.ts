// src/services/xag.service.ts
import sequelize from '../config/database';
import { TokenService } from './token.service';
import { ExternalApiService } from '.';
import { Op } from 'sequelize';
import { UpdateChannels, Firmwares, FirmwareVersions, ChannelsToFirmware, User } from '../models/';
import { logger } from '../app';
import axios from 'axios';

export class UpdateService {
  static async GetUpdate(req: any): Promise<any> {
    try {
        const result = await ExternalApiService.RedirectGet(
          req, 
          'v2.fw.xag.cn',
          'firmware_system_api/v2.2/get_update'
        );
        if (result.status !== 200 || !result.success) {
          logger.info('Update request failded, put direct response')
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
    const transaction = await sequelize.transaction();
    try {
      const {app_list, channel, target_version_code, version_code} = req.body;
      if (!app_list || !channel || !Array.isArray(app_list) || !target_version_code || !version_code) throw new Error('There is no data in post request');
      
      const token = req.headers.token;

      const user = await User.findOne({ where: { token } });
      if (!user) throw new Error('User not found');

      const params = req.query;
      const headers = req.headers;
      headers.host = 'v2.fw.xag.cn';
      headers.token = user.xag_token;
      headers.access_token = user.xag_token;
  
      const response = await axios.get(`https://v2.fw.xag.cn/firmware_system_api/v2.2/check_update/`, {
        headers,
        params,
      });

      const loadedUpdates = response.data;

      // Создаем/обновляем канал
      const [updateChannel] = await UpdateChannels.upsert({
        channel,
        ota_uuid: loadedUpdates.ota_uuid || "",
        target_version_code: loadedUpdates.target_version_code || 0,
        version_code: loadedUpdates.version_code || 0,
        version_name: loadedUpdates.version_name || "",
        version_type: loadedUpdates.version_type || 0
      }, { transaction });

      // Обрабатываем каждое приложение
      for (const firmwareToUpdate of app_list) {
        const [firmware] = await Firmwares.upsert({
          app_name: firmwareToUpdate.app_name,
          app_type: firmwareToUpdate.app_type || 0,
          display_name: firmwareToUpdate.display_name,
          group_name: firmwareToUpdate.group_name,
          pkg_name: firmwareToUpdate.pkg_name,
        }, { transaction });

        // Связываем приложение с каналом
        await ChannelsToFirmware.upsert({
          channel_id: updateChannel.id,
          firmware_id: firmware.id
        }, { transaction });

        // Создаем версию приложения
        await FirmwareVersions.upsert({
          firmware_id: firmware.id,
          version_code: firmwareToUpdate.version_code,
          version_name: firmwareToUpdate.version_name,
          file_md5: firmwareToUpdate.file_md5,
          file_path: firmwareToUpdate.file_path,
          file_url: firmwareToUpdate.file_url,
          file_size: firmwareToUpdate.file_size,
          lowest_available_version_code: firmwareToUpdate.lowest_available_version_code || 0,
          lowest_available_version_uuid: firmwareToUpdate.lowest_available_version_uuid || "",
          release_note: firmwareToUpdate.release_note,
          required: firmwareToUpdate.required || false,
          update_index: firmwareToUpdate.update_index || 0,
          app_uuid: firmwareToUpdate.app_uuid,
          app_version_uuid: firmwareToUpdate.app_version_uuid,
          dependence_version_code: firmwareToUpdate.dependence_version_code || 0,
          dependence_version_uuid: firmwareToUpdate.dependence_version_uuid || "",
        }, { transaction });
      }

      const localUpdateChannel = await UpdateChannels.findOne({ 
        where: { 
          channel, 
          target_version_code: { [Op.lte]: target_version_code },
          version_code: { [Op.lte]: version_code } 
        }, 
        transaction
      });

      const updates = [];

      if (localUpdateChannel){
        for (const reqFirmware of app_list) {
          // Находим приложение, связанное с каналом
          const firmware = await Firmwares.findOne({ 
            include: [{
              model: ChannelsToFirmware,
              where: {channel_id: localUpdateChannel.id}
            }],
            where: {pkg_name: reqFirmware.pkg_name },
            transaction
          })

          if (firmware) {
            // Ищем последнюю версию новее запрошенной
            const latestVersion = await FirmwareVersions.findOne({
              where: {
                firmware_id: firmware.id,
                version_code: { [Op.gt]: reqFirmware.version_code }
              },
              order: [['version_code', 'DESC']],
              transaction
            });

            if (latestVersion) {
              updates.push({
                app_name: firmware.app_name,
                app_type: firmware.app_type,
                app_uuid: latestVersion.app_uuid,
                app_version_uuid: latestVersion.app_version_uuid,
                dependence_version_code: latestVersion.dependence_version_code,
                dependence_version_uuid: latestVersion.dependence_version_uuid,
                display_name: firmware.display_name,
                file_md5: latestVersion.file_md5,
                file_path: latestVersion.file_path,
                file_size: latestVersion.file_size,
                file_url: latestVersion.file_url,
                group_name: firmware.group_name,
                lowest_available_version_code: latestVersion.lowest_available_version_code,
                lowest_available_version_uuid: latestVersion.lowest_available_version_uuid,
                pkg_name: firmware.pkg_name,
                release_note: latestVersion.release_note,
                required: latestVersion.required,
                update_index: latestVersion.update_index,
                version_code: latestVersion.version_code,
                version_name: latestVersion.version_name
              });
            }
          }
        }; 

        await transaction.commit();

        return {
          "code": 200,
          "data": {
            "app_list": updates,
            "channel": localUpdateChannel.channel,
            "ota_uuid": localUpdateChannel.ota_uuid,
            "target_version_code": localUpdateChannel.target_version_code,
            "version_code": localUpdateChannel.version_code,
            "version_name": localUpdateChannel.version_name,
            "version_type": localUpdateChannel.version_type,
          },
          "message": ""
        }
      }
    } catch (error) {
      await transaction.rollback();
      throw new Error(`Failed: ${error}`);
    }
  }
}
