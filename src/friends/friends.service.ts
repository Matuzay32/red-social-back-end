import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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
        { error: 'SORRY IT NOT  POSIBLE TO CREATED A FFRIEND' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    try {
      const friend = this.modelFriend.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'senderId',
            foreignField: '_id',
            as: 'friendsSender',
          },
        },

        {
          $lookup: {
            from: 'users',
            localField: 'senderId',
            foreignField: '_id',
            as: 'receptorFriend',
          },
        },
        { $unwind: '$receptorFriend' },
      ]);

      return friend;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        { error: 'ITS NOT POSIBLE TO FIND ALL FRIENDS' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findOne(id: string) {
    try {
      const friend = this.modelFriend.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },

        {
          $lookup: {
            from: 'users',
            localField: 'senderId',
            foreignField: '_id',
            as: 'friendsSender',
          },
        },

        {
          $lookup: {
            from: 'users',
            localField: 'senderId',
            foreignField: '_id',
            as: 'receptorFriend',
          },
        },
        { $unwind: '$receptorFriend' },
      ]);

      return friend;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        { error: `ITS NOT POSIBLE TO FIND FRIEND WITH ID #${id}` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(id: string, updateFriendDto: UpdateFriendDto) {
    try {
      const friend = this.modelFriend.findByIdAndUpdate(id, updateFriendDto);

      return friend;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        { error: `ITS NOT POSIBLE TO FIND FRIEND WITH ID #${id}` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  remove(id: string) {
    try {
      const friend = this.modelFriend.findByIdAndDelete(id);

      return friend;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        { error: `ITS NOT POSIBLE TO FIND FRIEND WITH ID #${id}` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
