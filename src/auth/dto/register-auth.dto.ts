import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(4)
  @ApiProperty()
  username: String;

  @IsNotEmpty()
  @ApiProperty()
  name: String;

  @IsNotEmpty()
  @ApiProperty()
  lastName: String;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @ApiProperty()
  @IsNotEmpty()
  countryId: String;

  @ApiProperty()
  @IsNotEmpty()
  genderId: String;

  @ApiProperty()
  @IsNotEmpty()
  sentimentalId: string;

  @ApiProperty()
  @IsNotEmpty()
  distributionId: string;
}
