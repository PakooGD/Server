import { User } from '../models/';
import { Whitelist } from '../models/';
import { ExternalApiService } from './';
import { Op } from 'sequelize';
import { TokenService } from './token.service';

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

  static async Login(req:any) {
      try {
        const { phone, password, icc } = req.body;
        if (!phone || !password || !icc)  throw new Error('Phone, password and icc are required');
      
        const user = await User.findOne({ 
          where: {[Op.or]: [{ phone }, { mobile: phone }]},
          include: [Whitelist] // Include whitelist entries
        });

        if (user) {
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) throw new Error(`Invalid password`);
          // Check if user exists in whitelist, if not add them
          if (!user.whitelistEntries || user.whitelistEntries.length === 0) {
            await Whitelist.create({
              user_id: user.id,
              phone: user.phone,
              access: false
            });
          }
          return {
              data: this.formatUserResponse(user),
              message: 'success',
              status: 200,
          };
        }
        const result = await ExternalApiService.RedirectPost(
          req, 
          'passport.xag.cn',
          'api/account/v1/user/token/login'
        );

        const newUser = await User.create({
            guid: result.data.guid,
            account_key: accountKeys[result.data.guid], 
            name: result.data.name,
            nickname: result.data.nickname,
            icc: result.data.icc,
            mobile: result.data.mobile,
            phone: result.data.phone,
            intro: result.data.intro,
            username: result.data.username,
            token: result.data.token,
            access_token: result.data.access_token,
            expire_in: result.data.expire_in,
            refresh_token: result.data.refresh_token,
            refresh_token_expire_in: result.data.refresh_token_expire_in,
            identity: result.data.identity,
            wechat_bind: result.data.wechat_bind,
            real_name: result.data.real_name,
            gender: result.data.gender,
            avatar: result.data.avatar,
            area: result.data.area,
            level: result.data.level,
            language: result.data.language,
            country_code: result.data.country_code,
            password: await bcrypt.hash(password, 10), 
        });
        // Add new user to whitelist with 'access: false'
        await Whitelist.create({
          user_id: newUser.id,
          phone: newUser.phone,
          access: false
        });
        
        delete accountKeys[result.data.guid];
        return result;
      } catch (error) {
          throw new Error(`External API login error: ${error}`);
      }
  }

  static async Register(req: any) {
    try {
      const token = req.headers.token;
      const user = await User.findOne({ where: { token } });
 
      if (user) {
        TokenService.VerifyAndUpdateUserToken(user)
        return {
            "success": false,
            "data": null,
            "message": "注册id不能为空",
            "status": 1017
        };
      }
      return await ExternalApiService.RedirectPost(
        req, 
        'message.xa.com',
        'api/message/v1/jpush/relation/register'
      );
    } catch (error) {
      throw new Error(`Registration error:${error}`);
    }
  }

  static async UserSettings(req:any) {
    try {
      const token = req.headers.token;
      const user = await User.findOne({ where: { token } });

      if (user) {
        TokenService.VerifyAndUpdateUserToken(user)
        return {
          "data": null,
          "message": "success",
          "status": 200
        };
      }
      return await ExternalApiService.RedirectGet(
        req, 
        'passport.xag.cn',
        'api/account/v1/common/user/setting/get'
      );
    } catch (error) {
      throw new Error(`Getting settings error:${error}`);
    }
  }

  static async IotSession() {
    try {
      return {
        "status": 200,
        "message": "Successful",
        "data": {
          "iot_user_session": TokenService.generateIotToken()
        }
      }
    } catch (error) {
      throw new Error(`Getting settings error:${error}`);
    }
  }

  static async Route(req:any) {
    try {
      const accountKey = req.query.account_key;
      if (!accountKey) throw new Error('Account key is required');

      const existingUser = await User.findOne({ where: { account_key: accountKey } });
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

      const result = await ExternalApiService.RedirectGet(
        req, 
        'passport.xag.cn',
        'api/account/v1/common/user/route'
      );

      accountKeys[result.data.user_guid.toString()] = accountKey;

      return result;
    } catch (error) {
      throw new Error(`Routing error: ${error}`);
    }
  }

  static async GetPaging() {
    try {
      return {
        message: "No Fly Zones Are Available.",
        status: 200,
        data: null
      };
    } catch (error) {
      throw new Error(`Paging error: ${error}`);
    }
  }
}

