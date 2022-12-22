import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album, AlbumDocument } from './schemas/album.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    try {
      const album = await this.albumModel.create(createAlbumDto);
      return album;
    } catch (error) {
      throw new HttpException(
        { reason: 'IMPOSIBLE TO CREATE THE ALBUM' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const album = await this.albumModel.find({});
      return album;
    } catch (error) {
      throw new HttpException(
        { reason: 'IMPOSIBLE TO FIND THE ALBUMS' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} album`;
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  async remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
