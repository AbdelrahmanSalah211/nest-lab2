import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, alphanumeric: true, minlength: 8 })
  password: string;

  @Prop({ required: true, min: 16, max: 60 })
  age: number;

  @Prop({ required: true, length: 11 })
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
