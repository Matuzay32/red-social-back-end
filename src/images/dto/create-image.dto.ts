import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateImageDto {
  @ApiProperty()
  @IsNotEmpty()
  name: String;

  @ApiProperty()
  @IsNotEmpty()
  title: String;

  @ApiProperty()
  content: String;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  distributionId: string;
}
