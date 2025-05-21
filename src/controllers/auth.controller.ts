import { Request, Response } from 'express';
import { AuthService } from '../services';
const crypto = require('crypto');

export class AuthController {
  private static sendResponse(res: Response, result: any) {
    const status = result.status >= 100 && result.status <= 599 ? result.status : 200;
    res.status(status).json({ ...result, status });
  }

  static async Route(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.Route(req.headers, req.query);
      AuthController.sendResponse(res, result);
    } catch (error) {
      console.error('Login error:', error);
      AuthController.sendResponse(res, {
        message: `${error}`,
        status: 500,
      })
    }
  }

  static async GetPaging(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.GetPaging(req.headers);
      AuthController.sendResponse(res, result);
    } catch (error) {
      console.error('Login error:', error);
      AuthController.sendResponse(res, {
        message: `${error}`,
        status: 500,
      })
    }
  }

  static async Login(req: Request, res: Response): Promise<void> {
    try {
      const { phone, password, icc } = req.body;
      if (!phone || !password || !icc)  throw new Error('Phone, password and icc are required');
      
      const result = await AuthService.login(req.headers, { phone, password, icc });
      AuthController.sendResponse(res, result);
    } catch (error) {
      console.error('Login error:', error);
      AuthController.sendResponse(res, {
        message: `${error}`,
        status: 500,
      })
    }
  }

  static async Register(req: Request, res: Response): Promise<void> {
    try {
      const { alias, app, app_id, platform, registration_id, tags, version } = req.body;

      const result = await AuthService.register({ 
        headers: req.headers, alias, app, app_id, platform, registration_id, tags, version 
      });

      AuthController.sendResponse(res, result);
    } catch (error) {
      console.error('Registration error:', error);
      AuthController.sendResponse(res, {
        message: `${error}`,
        status: 500,
      })
    }
  }

  static async Setting(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.getUserSettings(req.headers);
      AuthController.sendResponse(res, result);
    } catch (error) {
      console.error('Settings error:', error);
      AuthController.sendResponse(res, {
        message: `${error}`,
        status: 500,
      })
    }
  }

  static async getIotSession(req: Request, res: Response): Promise<void> {
    try {
      const result = {
        "status": 200,
        "message": "Successful",
        "data": {
          "iot_user_session": generateRandomToken()
        }
      }
      AuthController.sendResponse(res, result);
    } catch (error) {
      console.error('Settings error:', error);
      AuthController.sendResponse(res, {
        message: `${error}`,
        status: 500,
      })
    }
  }

}

function generateRandomToken() {
  const part1 = Buffer.from(crypto.randomBytes(32)).toString('base64url');
  const part2 = Buffer.from(crypto.randomBytes(32)).toString('base64url');
  return `${part1}.${part2}`;
}
