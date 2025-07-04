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
        const { app_list, channel, target_version_code, version_code } = req.body;
        if (!app_list || !channel || !Array.isArray(app_list) || target_version_code === undefined || !version_code === undefined) {
            throw new Error('Invalid request data');
        }

        const token = req.headers.token;
        const user = await User.findOne({ where: { token } });
        if (!user) throw new Error('User not found');

        logger.info(user.xag_token)


        const loadedUpdates = await ExternalApiService.RedirectPost(
          req, 
          'v2.fw.xag.cn',
          'firmware_system_api/v2.2/check_update',
          user.xag_token || token
        );

        // Создаем/обновляем канал
        const [updateChannel] = await UpdateChannels.upsert({
            channel,
            ota_uuid: loadedUpdates.ota_uuid || "",
            target_version_code: loadedUpdates.target_version_code || 0,
            version_code: loadedUpdates.version_code || 0,
            version_name: loadedUpdates.version_name || "",
            version_type: loadedUpdates.version_type || 0
        }, { transaction });

        // Подготовка данных для массовой вставки
        const firmwarePromises = app_list.map(fw => Firmwares.upsert({
            app_name: fw.app_name,
            app_type: fw.app_type || 0,
            display_name: fw.display_name,
            group_name: fw.group_name,
            pkg_name: fw.pkg_name,
        }, { transaction }));

        const firmwares = await Promise.all(firmwarePromises);

        // Связываем приложения с каналом
        const channelLinks = firmwares.map(([fw]) => ChannelsToFirmware.upsert({
            channel_id: updateChannel.id,
            firmware_id: fw.id
        }, { transaction }));

        // Создаем версии приложений
        const versionPromises = app_list.map((fw, i) => FirmwareVersions.upsert({
            firmware_id: firmwares[i][0].id,
            version_code: fw.version_code,
            version_name: fw.version_name,
            file_md5: fw.file_md5,
            file_path: fw.file_path,
            file_url: fw.file_url,
            file_size: fw.file_size,
            lowest_available_version_code: fw.lowest_available_version_code || 0,
            lowest_available_version_uuid: fw.lowest_available_version_uuid || "",
            release_note: fw.release_note,
            required: fw.required || false,
            update_index: fw.update_index || 0,
            app_uuid: fw.app_uuid,
            app_version_uuid: fw.app_version_uuid,
            dependence_version_code: fw.dependence_version_code || 0,
            dependence_version_uuid: fw.dependence_version_uuid || "",
        }, { transaction }));

        await Promise.all([...channelLinks, ...versionPromises]);

        // Поиск доступных обновлений
        const localUpdateChannel = await UpdateChannels.findOne({ 
            where: { 
                channel, 
                target_version_code: { [Op.lte]: target_version_code },
                version_code: { [Op.lte]: version_code } 
            }, 
            include: [{
                model: Firmwares,
                include: [{
                    model: FirmwareVersions,
                    where: {
                        version_code: { [Op.gt]: version_code }
                    },
                    required: false
                }]
            }],
            transaction
        });

        if (!localUpdateChannel) {
            await transaction.commit();
            return {
                code: 200,
                data: {},
                message: "No updates available"
            };
        }

        // Фильтрация обновлений
        const updates = localUpdateChannel.firmwares
            .filter(fw => fw.firmware_versions.length > 0)
            .map(fw => {
                const latestVersion = fw.firmware_versions[0]; // Уже отсортировано
                return {
                    app_name: fw.app_name,
                    app_type: fw.app_type,
                    app_uuid: latestVersion.app_uuid,
                    app_version_uuid: latestVersion.app_version_uuid,
                    dependence_version_code: latestVersion.dependence_version_code,
                    dependence_version_uuid: latestVersion.dependence_version_uuid,
                    display_name: fw.display_name,
                    file_md5: latestVersion.file_md5,
                    file_path: latestVersion.file_path,
                    file_size: latestVersion.file_size,
                    file_url: latestVersion.file_url,
                    group_name: fw.group_name,
                    lowest_available_version_code: latestVersion.lowest_available_version_code,
                    lowest_available_version_uuid: latestVersion.lowest_available_version_uuid,
                    pkg_name: fw.pkg_name,
                    release_note: latestVersion.release_note,
                    required: latestVersion.required,
                    update_index: latestVersion.update_index,
                    version_code: latestVersion.version_code,
                    version_name: latestVersion.version_name
                };
            });

        await transaction.commit();

        return {
            code: 200,
            data: {
                app_list: updates,
                channel: localUpdateChannel.channel,
                ota_uuid: localUpdateChannel.ota_uuid,
                target_version_code: localUpdateChannel.target_version_code,
                version_code: localUpdateChannel.version_code,
                version_name: localUpdateChannel.version_name,
                version_type: localUpdateChannel.version_type,
            },
            message: updates.length ? "" : "No updates available"
        };
    } catch (error) {
        await transaction.rollback();
        logger.error(`CheckUpdate failed: ${error}`);
        throw new Error(`Failed to check updates: ${error}`);
    }
  }
}
