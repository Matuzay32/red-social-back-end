import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDistributionDto } from './dto/create-distribution.dto';
import { UpdateDistributionDto } from './dto/update-distribution.dto';
import {
  Distribution,
  DistributionDocument,
} from './schemas/distribution.schema';
@Injectable()
export class DistributionsService {
  constructor(
    @InjectModel(Distribution.name)
    private distributionModel: Model<DistributionDocument>,
  ) {}

  create(createDistributionDto: CreateDistributionDto) {
    try {
      const distro = this.distributionModel.create(createDistributionDto);

      return distro;
    } catch (error) {
      throw new HttpException(
        { err: 'IMPOSIBLE TO CHANGE DISTRIBUTION' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findAll() {
    try {
      const distros = this.distributionModel.find().sort({ name: 1 });

      return distros;
    } catch (error) {
      throw new HttpException(
        { err: 'IMPOSIBLE TO VIEW ALL DISTROS' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findOne(id: string) {
    try {
      const distro = this.distributionModel.findById(id);

      return distro;
    } catch (error) {
      throw new HttpException(
        { err: `IMPOSIBLE TO FIND DISTRO WITH ID: #${id} ` },

        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(id: string, updateDistributionDto: UpdateDistributionDto) {
    try {
      const updateDistro = this.distributionModel.findByIdAndUpdate(
        id,
        updateDistributionDto,
      );

      return updateDistro;
    } catch (error) {
      throw new HttpException(
        { err: `IMPOSIBLE TO DELETE DISTRO WITH ID: #${id} ` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  remove(id: string) {
    try {
      const distro = this.distributionModel.findById(id);

      return distro;
    } catch (error) {
      throw new HttpException(
        { err: `IMPOSIBLE TO DELETE DISTRO WITH ID: #${id} ` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
