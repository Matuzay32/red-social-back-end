import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
export class CreateCommentDto {
  @ApiProperty()
  userId: String;

  @ApiProperty()
  typeIdRef: ObjectId[];

  @ApiProperty()
  comentId: String;

  @ApiProperty()
  content: String;
}
