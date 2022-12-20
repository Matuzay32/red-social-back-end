import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { ProfileInterFace } from '../profiles/interface.crear.profile';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}
  async create(CreateProfileDto: CreateProfileDto): Promise<any> {
    try {
      const profile = await this.profileModel.create(CreateProfileDto);
      return profile;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: 'ITS_NOT_POSIBLE_TO_CREATE' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<any[]> {
    try {
      const profile = await this.profileModel.aggregate([
        {
          $lookup: {
            from: 'users', //la tabla a la que ser quiere unir
            localField: 'userId', //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: '_id', // esta seria la equivalente a la clave foranea
            as: 'usuario',
          },
        },
        { $unwind: '$usuario' },
        {
          $lookup: {
            from: 'sentimentals', //la tabla a la que ser quiere unir
            localField: 'sentimentalId', //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: '_id', // esta seria la equivalente a la clave foranea
            as: 'sentimental',
          },
        },
        { $unwind: '$sentimental' },

        {
          $lookup: {
            from: 'distributions', //la tabla a la que ser quiere unir
            localField: 'distributionId', //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: '_id', // esta seria la equivalente a la clave foranea
            as: 'distribution',
          },
        },
        { $unwind: '$distribution' },

        {
          $lookup: {
            from: 'countries', //la tabla a la que ser quiere unir
            localField: 'countryId', //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: '_id', // esta seria la equivalente a la clave foranea
            as: 'country',
          },
        },
        { $unwind: '$country' },
      ]);
      return profile;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: 'NOT_FIND_NOTHING' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const profile = await this.profileModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: 'users', //la tabla a la que ser quiere unir
            localField: 'userId', //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: '_id', // esta seria la equivalente a la clave foranea
            as: 'usuario',
          },
        },
        { $unwind: '$usuario' },
        {
          $lookup: {
            from: 'sentimentals', //la tabla a la que ser quiere unir
            localField: 'sentimentalId', //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: '_id', // esta seria la equivalente a la clave foranea
            as: 'sentimental',
          },
        },
        { $unwind: '$sentimental' },

        {
          $lookup: {
            from: 'distributions', //la tabla a la que ser quiere unir
            localField: 'distributionId', //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: '_id', // esta seria la equivalente a la clave foranea
            as: 'distribution',
          },
        },
        { $unwind: '$distribution' },

        {
          $lookup: {
            from: 'countries', //la tabla a la que ser quiere unir
            localField: 'countryId', //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: '_id', // esta seria la equivalente a la clave foranea
            as: 'country',
          },
        },
        { $unwind: '$country' },
      ]);
      return profile;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE profile WITH #${id} ` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, UpdateProfileDto: UpdateProfileDto): Promise<any> {
    try {
      const profile = await this.profileModel.findByIdAndUpdate(
        id,
        UpdateProfileDto,
      );
      return profile;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          reason: `IMPOSIBLE TO FIND THE profile WITH #${id} FOR UPDATED `,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string): Promise<any> {
    try {
      const profile = await this.profileModel.findByIdAndRemove(id);
      return profile;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE profile WITH #${id} FOR DELETE` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
