import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  imageId: (ObjectId | String)[];

  @ApiProperty()
  userId: string;

  @ApiProperty()
  distributionId: string;

  @ApiProperty()
  commentId: string;
}
