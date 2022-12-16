import { ApiProperty } from '@nestjs/swagger';

export class CreateDistributionDto {
  @ApiProperty()
  name: String;
}
