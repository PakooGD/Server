import axios from 'axios';

export class ExternalApiService {
  public static sendResponse(res: any, result: any) {
    const status = result.status >= 100 && result.status <= 599 ? result.status : 200;
    res.status(status).json({ ...result, status });
  }

  public static async RedirectPost(req: any, host:any, api:any): Promise<any> {
    const params = req.query
    const headers = { ...req.headers }
    const responseData = { ...req.body }
    const response = await axios.post(
      `https://${host}/${api}`, 
      responseData, 
      { 
        headers: {
          headers,
          host: host
        },
        params
      }
    );
    return response.data;
  }

  public static async RedirectGet(req: any, host:any, api:any): Promise<any> {
    const params = req.query
    const headers = { ...req.headers }
    const response = await axios.get(
      `https://${host}/${api}`, 
      { 
        headers: {
          headers,
          host: host
        },
        params
      }
    );
    return response.data;
  }

}