import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

class BaseAuthDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Password must be alphanumeric',
  })
  password: string;
}

export class SignInDto extends BaseAuthDto {}

export class SignUpDto extends BaseAuthDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt({ message: 'Age must be an integer' })
  @Min(16, { message: 'Minimum age is 16' })
  @Max(60, { message: 'Maximum age is 60' })
  age: number;

  @ApiProperty()
  @Matches(/^01[0-9]{9}$/, {
    message: 'Phone number must start with 01 and be 11 digits',
  })
  phone: string;
}
