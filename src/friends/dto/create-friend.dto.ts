import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
export class CreateFriendDto {
  @ApiProperty()
  senderId: String;

  @ApiProperty()
  receptorId: String;

  @ApiProperty()
  isAccepted: Boolean;

  @ApiProperty()
  isReaded: Boolean;
}
