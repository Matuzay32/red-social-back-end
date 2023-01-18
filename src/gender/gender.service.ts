import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GenderDocument, Gender } from './schemas/gender.schema';
import { CreateGenderInterface } from './create-gender.interface';

@Injectable()
export class GenderService {
  constructor(
    @InjectModel(Gender.name) private gerderModel: Model<GenderDocument>,
  ) {}

  async create(
    createGerderDto: CreateGenderDto,
  ): Promise<CreateGenderInterface> {
    try {
      const gender = await this.gerderModel.create(createGerderDto);
      return gender;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: 'ITS_NOT_POSIBLE_TO_CREATE' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<CreateGenderInterface[]> {
    try {
      const gender = await this.gerderModel.find({}).sort({ name: 1 });
      return gender;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: 'NOT_FIND_NOTHING' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string): Promise<CreateGenderInterface> {
    try {
      const gender = await this.gerderModel.findById(id);
      return gender;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE GENDER WITH #${id} ` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    UpdateGenderDto: UpdateGenderDto,
  ): Promise<CreateGenderInterface> {
    try {
      const gender = await this.gerderModel.findByIdAndUpdate(
        id,
        UpdateGenderDto,
      );
      return gender;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE GENDER WITH #${id} FOR UPDATED ` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string): Promise<CreateGenderInterface> {
    try {
      const gender = await this.gerderModel.findByIdAndDelete(id);
      return gender;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE GENDER WITH #${id} FOR DELETE` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
