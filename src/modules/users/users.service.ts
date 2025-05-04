import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IJwtPayload } from 'src/interfaces/jwt-payload.interface';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  getAllUsers(user: IJwtPayload) {
    return this.userModel.find({
      _id: { $ne: user._id },
    }).select('username age email phone');
  }

  async getProfile(user: IJwtPayload) {
    return this.userModel
      .findOne({ _id: user._id })
      .select('username age email phone');
  }
}
