import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SignUpDto, SignInDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  async signUp(dto: SignUpDto) {
    const { fullName, email, password, age, phone } = dto;
    let user = await this.userModel.findOne({ email });
    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await this.userModel.create({
      fullName,
      email,
      password: hashedPassword,
      age,
      phone,
    });
    await user.save();

    const { password: _password , ...userData } = user.toJSON();
    return userData;
  }

  async signIn(dto: SignInDto) {
    const { email, password } = dto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new ForbiddenException('User with this email does not exist');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Password is incorrect');
    }

    const { _id } = user.toJSON();
    const payload = { _id, email };

    const accessToken = jwt.sign(
      payload,
      this.configService.getOrThrow<string>('JWT_SECRET'),
      { expiresIn: '12h' },
    );

    const { password: _password , ...userData } = user.toJSON();

    return {
      accessToken,
      user: {
        ...userData,
      },
    };
  }
}
