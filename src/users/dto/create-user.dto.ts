import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  username: String;
  @IsNotEmpty()
  password: String;
  @IsEmail()
  email: String;
  createdAt: Date;
}
