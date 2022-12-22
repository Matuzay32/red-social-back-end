import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album, AlbumDocument } from './schemas/album.schema';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return 'This action adds a new album';
  }

  async findAll() {
    return `This action returns all albums`;
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
