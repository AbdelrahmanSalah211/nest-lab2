import { Body, Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { IJwtPayload } from 'src/interfaces/jwt-payload.interface';

@ApiBearerAuth()
@Controller('/users')
export class UsersController {
  constructor(private readonly service: UsersService) {}
  @Get('/all')
  getAllUsers(@GetUser() user: IJwtPayload) {
    return this.service.getAllUsers(user);
  }
  @Get('/myprofile')
  getProfile(@GetUser() user: IJwtPayload) {
    return this.service.getProfile(user);
  }
}
