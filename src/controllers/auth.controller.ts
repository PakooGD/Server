import { Request, Response } from 'express';
import { AuthService } from '../services';

export class AuthController {
  private static sendResponse(res: Response, result: any) {
    const status = result.status >= 100 && result.status <= 599 ? result.status : 200;
    res.status(status).json({ ...result, status });
  }

  static async Route(req: Request, res: Response): Promise<void> {
    try {
      const headers = { ...req.headers };
      headers.host = 'passport.xag.cn'
      const query = req.query
      const result = await AuthService.Route(headers, query);
      console.log(JSON.stringify(result))
      AuthController.sendResponse(res, result);
    } catch (error) {
      console.error('Login error:', error);
      AuthController.sendResponse(res, {
        message: 'Internal server error',
        status: 500,
      });
    }
  }

  static async GetPaging(req: Request, res: Response): Promise<void> {
    try {
      const headers = { ...req.headers };
      const result = await AuthService.GetPaging(headers);
      console.log(JSON.stringify(result))
      AuthController.sendResponse(res, result);
    } catch (error) {
      console.error('Login error:', error);
      AuthController.sendResponse(res, {
        message: 'Internal server error',
        status: 500,
      });
    }
  }

  static async Login(req: Request, res: Response): Promise<void> {
    try {
      const { phone, password, icc } = req.body;

      if (!phone || !password || !icc) {
        AuthController.sendResponse(res, {
          message: 'Phone, password and icc are required',
          status: 400,
        });
        return;
      }

      const headers = { ...req.headers };
      headers.host = 'passport.xag.cn'
      const result = await AuthService.login(headers, { phone, password, icc });
      console.log(JSON.stringify(result))
      AuthController.sendResponse(res, result);
    } catch (error) {
      console.error('Login error:', error);
      AuthController.sendResponse(res, {
        message: 'Internal server error',
        status: 500,
      });
    }
  }

  static async Register(req: Request, res: Response): Promise<void> {
    try {
      const { alias, app, app_id, platform, registration_id, tags, version } = req.body;

      const headers = { ...req.headers };
      headers.host = 'message.xa.com'
      const result = await AuthService.register({ 
        headers,
        alias, 
        app, 
        app_id, 
        platform, 
        registration_id, 
        tags, 
        version 
      });
      console.log(JSON.stringify(result))
      AuthController.sendResponse(res, result);
    } catch (error) {
      console.error('Registration error:', error);
      AuthController.sendResponse(res, {
        message: 'Internal server error',
        status: 500,
      });
    }
  }

  static async Setting(req: Request, res: Response): Promise<void> {
    try {
      const headers = { ...req.headers };
      headers.host = 'passport.xag.cn'
      const result = await AuthService.getUserSettings(headers);
      console.log(JSON.stringify(result))
      AuthController.sendResponse(res, result);
    } catch (error) {
      console.error('Settings error:', error);
      AuthController.sendResponse(res, {
        message: 'Internal server error',
        status: 500,
      });
    }
  }
}

