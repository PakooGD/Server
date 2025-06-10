import { Request, Response } from 'express';
import { AuthService, ExternalApiService } from '../services';

export class AuthController {
  static async Route(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.Route(req);
      ExternalApiService.sendResponse(res, result);
    } catch (error) {
      console.error('Login error:', error);
      ExternalApiService.sendResponse(res, {
        message: `${error}`,
        status: 500,
      })
    }
  }

  static async GetPaging(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.GetPaging();
      ExternalApiService.sendResponse(res, result);
    } catch (error) {
      console.error('Login error:', error);
      ExternalApiService.sendResponse(res, {
        message: `${error}`,
        status: 500,
      })
    }
  }

  static async Login(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.Login(req);
      ExternalApiService.sendResponse(res, result);
    } catch (error) {
      console.error('Login error:', error);
      ExternalApiService.sendResponse(res, {
        message: `${error}`,
        status: 500,
      })
    }
  }

  static async Register(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.Register(req);
      ExternalApiService.sendResponse(res, result);
    } catch (error) {
      console.error('Registration error:', error);
      ExternalApiService.sendResponse(res, {
        message: `${error}`,
        status: 500,
      })
    }
  }

  static async UserSettings(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.UserSettings(req);
      ExternalApiService.sendResponse(res, result);
    } catch (error) {
      console.error('Settings error:', error);
      ExternalApiService.sendResponse(res, {
        message: `${error}`,
        status: 500,
      })
    }
  }

  static async getIotSession(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthService.IotSession();
      ExternalApiService.sendResponse(res, result);
    } catch (error) {
      console.error('Settings error:', error);
      ExternalApiService.sendResponse(res, {
        message: `${error}`,
        status: 500,
      })
    }
  }
}

