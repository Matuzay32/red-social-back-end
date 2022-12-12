import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: String;
  @IsNotEmpty()
  password: String;
  @IsEmail()
  email: String;
  createdAt: Date;
}
