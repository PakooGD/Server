import axios from 'axios';

export class ExternalApiService {
  public static sendResponse(res: any, result: any) {
    const status = result.status >= 100 && result.status <= 599 ? result.status : 200;
    res.status(status).json({ ...result, status });
  }

  public static async RedirectPost(req: any, host: string, api: string ): Promise<any> {
    const params = req.query;
    const headers = req.headers;
    headers['Host'] = host;
  
    const url = `https://passport.xag.cn/${api}`;
  
    const response = await axios.post(url, req.body, {
      headers: {
        ...headers,
      },
      params,
    });
  
    return response.data;
  }

  public static async RedirectGet(req: any, host:any, api:any): Promise<any> {
    const params = req.query;
    const headers = req.headers;
    headers['Host'] = host;

    const url = `https://passport.xag.cn/${api}`;
  
    const response = await axios.get(url, {
      headers: {
        ...headers,
      },
      params,
    });
    return response.data;
  }

}