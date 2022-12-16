import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: String;
  @IsNotEmpty()
  @ApiProperty()
  password: String;
  @IsEmail()
  @ApiProperty()
  email: String;
  createdAt: Date;
}
