import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateAlbumDto {
  @ApiProperty()
  @IsNotEmpty()
  title: String;

  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  distributionId: string;

  @ApiProperty()
  commentId: string;

  @ApiProperty()
  imageId: ObjectId[];
}
