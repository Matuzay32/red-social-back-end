import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  username: String;
}
