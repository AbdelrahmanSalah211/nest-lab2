import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers['authorization'];

    if (!bearerToken) {
      throw new UnauthorizedException();
    }

    const token = bearerToken.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = jwt.verify(
        token,
        this.configService.getOrThrow<string>('JWT_SECRET'),
      );

      req['user'] = payload;
      next();
    } catch (error) {
      console.error('JWT verification error:', error);
      throw new UnauthorizedException();
    }
  }
}
