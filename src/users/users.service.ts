import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserSchema, UserDocument } from './schemas/user.schema';
import { CreateUserInterface } from './interface/create-user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<CreateUserInterface[]> {
    try {
      const users = await this.userModel.aggregate([
        {
          $lookup: {
            from: 'countries', //la tabla a la que ser quiere unir
            localField: 'countryId', //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: '_id', // esta seria la equivalente a la clave foranea
            as: 'country',
          },
        },
        { $unwind: '$country' },

        { $project: { username: 0, password: 0 } },

        {
          $lookup: {
            from: 'sentimentals', //la tabla a la que ser quiere unir
            localField: 'sentimentalId', //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: '_id', // esta seria la equivalente a la clave foranea
            as: 'sentimentalSituation',
          },
        },
        { $unwind: '$sentimentalSituation' },

        {
          $lookup: {
            from: 'distributions', //la tabla a la que ser quiere unir
            localField: 'distributionId', //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: '_id', // esta seria la equivalente a la clave foranea
            as: 'perfil',
          },
        },
        { $unwind: '$perfil' },
      ]);

      return users;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No fue posible devolver todos los usuarios',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: string): Promise<CreateUserInterface[]> {
    try {
      const user = await this.userModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },

        {
          $lookup: {
            from: 'countries', //la tabla a la que ser quiere unir
            localField: 'countryId', //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: '_id', // esta seria la equivalente a la clave foranea
            as: 'country',
          },
        },
        { $unwind: '$country' },

        { $project: { username: 0, password: 0 } },

        {
          $lookup: {
            from: 'sentimentals', //la tabla a la que ser quiere unir
            localField: 'sentimentalId', //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: '_id', // esta seria la equivalente a la clave foranea
            as: 'sentimentalSituation',
          },
        },
        { $unwind: '$sentimentalSituation' },

        {
          $lookup: {
            from: 'distributions', //la tabla a la que ser quiere unir
            localField: 'distributionId', //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: '_id', // esta seria la equivalente a la clave foranea
            as: 'perfil',
          },
        },
        { $unwind: '$perfil' },
      ]);
      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `No fue posible de encontrar el usuario con el id ${id}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<CreateUserInterface> {
    try {
      return this.userModel.findByIdAndUpdate(id, updateUserDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `No fue posible de encontrar el usuario con el id ${id}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string): Promise<CreateUserInterface> {
    try {
      return this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `No fue posible de encontrar el usuario con el id ${id}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
