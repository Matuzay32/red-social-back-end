import { ApiProperty } from '@nestjs/swagger';
export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string[];

  @ApiProperty()
  userId: string;

  @ApiProperty()
  distributionId: string;

  @ApiProperty()
  commentId: string;
}
