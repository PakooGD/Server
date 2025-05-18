import crypto from 'crypto';
import { User } from '../models/user.model';

export class TokenService {
  static async refreshToken(refreshTokenExpiration:any) {
    try {
        if(!TokenService.verifyToken(refreshTokenExpiration)){
            throw new Error('Refresh token expired');
        }
        const result = TokenService.createTokens()
        return result;
    } catch (error) {
        console.error('Token refresh failed:', error);
    }
  }

  static async VerifyAndUpdateUserToken(user:any) {
    try {
      if (!TokenService.verifyToken(user.expire_in)) {
        const result = await TokenService.refreshToken(user.refresh_token_expire_in);

        if(!result) throw new Error('Token expired and refresh failed');

        await user.update({
          access_token: result.access_token,
          refresh_token: result.refresh_token,
          expire_in: result.expire_in,
          refresh_token_expire_in: result.refresh_token_expire_in,
        });
      }
    } catch (error) {
      throw new Error('Token expired and refresh failed');
    }
  }


  private static async createTokens() {
    return {
        access_token: TokenService.generateToken(),
        refresh_token: TokenService.generateToken(),
        expire_in: TokenService.getTokenExpiry(1), 
        refresh_token_expire_in: TokenService.getTokenExpiry(30), 
    }
  }

  private static generateToken(): string {
    return crypto.randomBytes(32).toString('hex'); // 64-char hex string
  }

  private static getTokenExpiry(days = 30): number {
    const now = new Date();
    now.setDate(now.getDate() + days);
    return Math.floor(now.getTime() / 1000); // UNIX timestamp
  }

  public static async verifyToken(tokenExpiration:any) {
    const now = Math.floor(Date.now() / 1000);
    return tokenExpiration < now
  }
}