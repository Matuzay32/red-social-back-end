import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend, FriendDocument } from './schemas/friend.schema';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friend.name) private modelFriend: Model<FriendDocument>,
  ) {}

  create(createFriendDto: CreateFriendDto) {
    try {
      const friend = this.modelFriend.create(createFriendDto);
      return friend;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        { error: 'Sorry no posible to created a friend' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    return `This action returns all friends`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friend`;
  }

  update(id: number, updateFriendDto: UpdateFriendDto) {
    return `This action updates a #${id} friend`;
  }

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
