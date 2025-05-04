import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtPayload } from 'src/interfaces/jwt-payload.interface';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IJwtPayload;
  },
);
