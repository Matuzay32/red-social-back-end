import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  isNotEmpty,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginAuthDto {
  @ApiProperty()
  @MaxLength(12)
  @MinLength(4)
  @IsNotEmpty()
  password: String;
  @IsEmail()
  @ApiProperty()
  email: String;
}
