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
  @MaxLength(12)
  @MinLength(4)
  @ApiProperty()
  nombre: String;

  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(4)
  @ApiProperty()
  Apellido: String;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  fechaNacimiento: Date;

  @ApiProperty()
  @IsNotEmpty()
  pais: String;
}
