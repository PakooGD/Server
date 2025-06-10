import axios from 'axios';

export class ExternalApiService {
  public static sendResponse(res: any, result: any) {
    const status = result.status >= 100 && result.status <= 599 ? result.status : 200;
    res.status(status).json({ ...result, status });
  }

  public static async RedirectPost(req: any, url:any, api:any): Promise<any> {
    const params = req.query
    console.log(`https://${url}/${api}`, ...req.body, ...req.headers)
    const response = await axios.post(
      `https://${url}/${api}`, 
      { ...req.body }, 
      { 
        headers: {
          ...req.headers,
          host: `${url}`
        },
        params
      }
    );
    return response.data;
  }

  public static async RedirectGet(req: any, url:any, api:any): Promise<any> {
    const params = req.query
    console.log(`https://${url}/${api}`, ...req.body, ...req.headers)
    const response = await axios.get(
      `https://${url}/${api}`, 
      { 
        headers: {
          ...req.headers,
          host: `${url}`
        },
        params
      }
    );
    return response.data;
  }

}