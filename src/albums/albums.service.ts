import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album, AlbumDocument } from './schemas/album.schema';
import { Comment, DocumentComment } from '../comments/schemas/comment.schemas';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Comment.name) private commentModel: Model<DocumentComment>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    try {
      const album = await this.albumModel.create(createAlbumDto);
      return album;
    } catch (error) {
      throw new HttpException(
        { reason: `IMPOSIBLE TO CREATE THE ALBUM` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const albums = await this.albumModel.aggregate([
        { $project: { __v: 0 } },
        {
          $lookup: {
            from: `distributions`, //la tabla a la que ser quiere unir
            localField: `distributionId`, //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: `_id`, // esta seria la equivalente a la clave foranea
            as: `perfil`,
          },
        },
        { $unwind: `$perfil` },
        {
          $lookup: {
            from: `users`, //la tabla a la que ser quiere unir
            localField: `userId`, //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: `_id`, // esta seria la equivalente a la clave foranea
            as: `user`,
          },
        },
        { $unwind: `$user` },

        {
          $project: {
            user: {
              password: 0,
              username: 0,
              countryId: 0,
              sentimentalId: 0,
              distributionId: 0,
              isAdmin: 0,
              __v: 0,
            },
          },
        },
      ]);
      return albums;
    } catch (error) {
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE ALBUMS` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string) {
    try {
      const albums = await this.albumModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },

        { $project: { __v: 0 } },
        {
          $lookup: {
            from: `distributions`, //la tabla a la que ser quiere unir
            localField: `distributionId`, //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: `_id`, // esta seria la equivalente a la clave foranea
            as: `perfil`,
          },
        },
        { $unwind: `$perfil` },
        {
          $lookup: {
            from: `users`, //la tabla a la que ser quiere unir
            localField: `userId`, //seria la clave a la que ser referenciar casi siempre seria id
            foreignField: `_id`, // esta seria la equivalente a la clave foranea
            as: `user`,
          },
        },
        { $unwind: `$user` },

        {
          $project: {
            user: {
              password: 0,
              username: 0,
              countryId: 0,
              sentimentalId: 0,
              distributionId: 0,
              isAdmin: 0,
              __v: 0,
            },
          },
        },
      ]);
      return albums;
    } catch (error) {
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE ALBUM with id  ${id} ` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllComments(id: string) {
    try {
      const comments = await this.commentModel.find({ typeIdRef: id });

      return comments;
    } catch (error) {
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THIS COMMENTS  ` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      return this.albumModel.findByIdAndUpdate(id, updateAlbumDto);
    } catch (error) {
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE ALBUM with id  ${id} ` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string) {
    try {
      return this.albumModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE ALBUM with id  ${id} ` },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
