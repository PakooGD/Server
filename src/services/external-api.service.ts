import axios from 'axios';
import { Request, Response } from 'express';

export class ExternalApiService {


  public static async RedirectPost(req: Request, host: string, api: string ): Promise<any> {
    const params = req.query;
    const headers = req.headers;
    headers.host = host;
  
    const url = `https://${host}/${api}`;

    const response = await axios.post(url, {...req.body}, {
      headers: {
        ...headers,
        host: host
      },
      params,
    });
  
    return response.data;
  }

  public static async RedirectGet(req: Request, host:string, api:string): Promise<any> {
    const params = req.query;
    const headers = req.headers;
    headers.host = host;

    const url = `https://${host}/${api}`;

    const response = await axios.get(url, {
      headers: {
        ...headers,
        host: host
      },
      params,
    });
    return response.data;
  }

}

