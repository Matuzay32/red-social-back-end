import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCountryDto {
  @IsNotEmpty()
  @ApiProperty()
  name: String;
  @IsNotEmpty()
  @ApiProperty()
  preffix: String;
}
