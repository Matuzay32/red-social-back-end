import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(4)
  username: String;
}
