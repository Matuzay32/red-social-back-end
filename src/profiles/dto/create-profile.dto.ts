import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty()
  birthday: String;
  @ApiProperty()
  gender: String;
  @ApiProperty()
  image: String;
  @ApiProperty()
  imageHeader: String;
  @ApiProperty()
  title: String;
  @ApiProperty()
  bio: String;
  @ApiProperty()
  likes: Number;
  @ApiProperty()
  dislikes: Number;
  @ApiProperty()
  publicEmail: String;
  @ApiProperty()
  userId: String;
  @ApiProperty()
  sentimentalId: String;
  @ApiProperty()
  countryId: String;
  @ApiProperty()
  distributionId: String;
}
