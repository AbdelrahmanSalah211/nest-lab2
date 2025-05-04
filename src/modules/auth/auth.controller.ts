import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post('/signup')
  signUp(@Body() dto: SignUpDto) {
    return this.service.signUp(dto);
  }
  @Post('/signin')
  signIn(@Body() dto: SignInDto) {
    return this.service.signIn(dto);
  }
}
