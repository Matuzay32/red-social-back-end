import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country, CountryDocument } from './schemas/country.schemas';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CountrysService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
  ) {}

  async create(createCountryDto: CreateCountryDto) {
    try {
      const country = await this.countryModel.create(createCountryDto);
      return country;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: 'ITS_NOT_POSIBLE_TO_CREATE' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const countrys = await this.countryModel.find({}).sort({ name: 1 });
      return countrys;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: 'NOT_FIND_NOTHING' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string) {
    try {
      const country = await this.countryModel.findById(id);
      return country;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE COUNTRY WITH #${id} ` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    try {
      const country = await this.countryModel.findByIdAndUpdate(
        id,
        updateCountryDto,
      );
      return country;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE COUNTRY WITH #${id} FOR UPDATED ` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      const country = await this.countryModel.findById(id);
      return country;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE COUNTRY WITH #${id} FOR DELETE` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
