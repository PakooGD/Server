import { Request, Response } from 'express';
import { AuthService, ExternalApiService } from '../services';

export class AuthController {
  public static sendResponse(res: Response, result: any) {
    const status = result.status >= 100 && result.status <= 599 ? result.status : 200;
    res.status(status).json({ ...result, status });
  }

  static async Route(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.Route(req);
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
      const result = await AuthService.GetPaging();
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
      const result = await AuthService.Login(req);
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
      const result = await AuthService.Register(req);
      AuthController.sendResponse(res, result);
    } catch (error) {
      console.error('Registration error:', error);
      AuthController.sendResponse(res, {
        message: `${error}`,
        status: 500,
      })
    }
  }

  static async UserSettings(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.UserSettings(req);
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
      const result = await AuthService.IotSession();
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

