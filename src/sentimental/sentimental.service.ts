import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSentimentalDto } from './dto/create-sentimental.dto';
import { UpdateSentimentalDto } from './dto/update-sentimental.dto';
import {
  Sentimental,
  SentimentalDocument,
} from '../sentimental/schemas/sentimental.entity';
import { Model } from 'mongoose';
import { CreateSentimentalInterface } from './create.sentimental.interface';

@Injectable()
export class SentimentalService {
  constructor(
    @InjectModel(Sentimental.name)
    private sentimentalModel: Model<SentimentalDocument>,
  ) {}

  async create(
    CreateSentimentalDto: CreateSentimentalDto,
  ): Promise<CreateSentimentalInterface> {
    try {
      const sentimental = await this.sentimentalModel.create(
        CreateSentimentalDto,
      );
      return sentimental;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: 'ITS_NOT_POSIBLE_TO_CREATE' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<CreateSentimentalInterface[]> {
    try {
      const sentimental = await this.sentimentalModel
        .find({})
        .sort({ name: 1 });
      return sentimental;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: 'NOT_FIND_NOTHING' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string): Promise<CreateSentimentalInterface> {
    try {
      const sentimental = await this.sentimentalModel.findById(id);
      return sentimental;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE sentimental WITH #${id} ` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    UpdateSentimentalDto: UpdateSentimentalDto,
  ): Promise<CreateSentimentalInterface> {
    try {
      const sentimental = await this.sentimentalModel.findByIdAndUpdate(
        id,
        UpdateSentimentalDto,
      );
      return sentimental;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          reason: `IMPOSIBLE TO FIND THE sentimental WITH #${id} FOR UPDATED `,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string): Promise<CreateSentimentalInterface> {
    try {
      const sentimental = await this.sentimentalModel.findByIdAndRemove(id);
      return sentimental;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE sentimental WITH #${id} FOR DELETE` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
