import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenderDto {
  @ApiProperty()
  @IsNotEmpty()
  name: String;
}
