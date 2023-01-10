import {
  HttpException,
  HttpStatus,
  Injectable,
  mixin,
  NestMiddleware,
  Type,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TokenService } from 'src/users/token.service';

export function createAuthMidleware(role: string): Type<NestMiddleware> {
  @Injectable()
  class AuthMidleWare implements NestMiddleware {
    constructor(private tokenService: TokenService) {}
    async use(req: Request, res: Response, next: NextFunction) {
      const authHeader = req.headers.authorization;
      if (!authHeader)
        throw new HttpException('Auth fail', HttpStatus.UNAUTHORIZED);
      const accessToken = authHeader.split(' ')[1];
      if (!accessToken)
        throw new HttpException('Auth fail', HttpStatus.UNAUTHORIZED);
      const userData: any = await this.tokenService.validateAccessToken(
        accessToken,
      );
      if (!userData)
        throw new HttpException('Auth fail', HttpStatus.UNAUTHORIZED);
      if (userData.role !== role && userData.role !== 'ADMIN')
        throw new HttpException('Auth fail', HttpStatus.UNAUTHORIZED);
      next();
    }
  }
  return mixin(AuthMidleWare);
}
