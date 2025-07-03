import axios from 'axios';
import { Request, Response } from 'express';
import { logger } from '../app';

export class ExternalApiService {


  public static async RedirectPost(req: Request, host: string, api: string ): Promise<any> {
    const params = req.query;
    const headers = req.headers;
    headers.host = host;
  
    const url = `https://${host}/${api}`;

    const response = await axios.post(url, {...req.body}, {
      headers,
      params,
    });
  
    return response.data;
  }

  public static async RedirectGet(req: Request, host:string, api:string): Promise<any> {
    const params = req.query;
    const headers = req.headers;
    headers.host = host;

    const url = `https://${host}/${api}`;
    logger.info("Request URL:", url);
    logger.info("Headers:", headers);
    logger.info("params:", params);
    const response = await axios.get(url, {
      headers,
      params,
    });
    
    return response.data;
  }

}

