import {
  IsEmail,
  isNotEmpty,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginAuthDto {
  @MaxLength(12)
  @MinLength(4)
  @IsNotEmpty()
  password: String;
  @IsEmail()
  email: String;
}
