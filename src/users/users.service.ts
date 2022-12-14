import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserSchema, UserDocument } from './schemas/user.schema';
import { CreateUserInterface } from './interface/create-user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<CreateUserInterface[]> {
    try {
      return this.userModel.find({}).sort({ createdAt: -1 });
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

  async findOne(id: string): Promise<CreateUserInterface> {
    try {
      return this.userModel.findById(id);
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
