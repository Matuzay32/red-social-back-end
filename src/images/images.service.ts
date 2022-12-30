import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image, ImageDocument } from './schemas/image.schema';
import { ImageInterface } from './image.interface';
import { CreateCommentInterface } from '../comments/create-comment.interface';
import { Comment, DocumentComment } from 'src/comments/schemas/comment.schemas';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<DocumentComment>,
    @InjectModel(Image.name) private modelImage: Model<ImageDocument>,
  ) {}

  async create(createImageDto: CreateImageDto) {
    try {
      const image = await this.modelImage.create(createImageDto);
      return image;
    } catch (error) {
      throw new HttpException(
        { reason: `IMPOSIBLE TO CREATE THE ALBUM` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<ImageInterface[]> {
    try {
      const images = await this.modelImage.aggregate([
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
      return images;
    } catch (error) {
      throw new HttpException(
        { error: 'IMPOSIBLE TO FIND ALL IMAGES' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllComments(id: string): Promise<CreateCommentInterface[]> {
    try {
      const comments = await this.commentModel.aggregate([
        {
          $match: { typeIdRef: new mongoose.Types.ObjectId(id) },
        },

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
      return comments;

      return comments;
    } catch (error) {
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THIS COMMENTS  ` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string): Promise<ImageInterface[]> {
    try {
      const images = await this.modelImage.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
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
      return images;
    } catch (error) {
      throw new HttpException(
        { error: `IMPOSIBLE TO FIND THE IMAGE WITH ID #${id} ` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    try {
      return this.modelImage.findByIdAndUpdate(id, updateImageDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `IMPOSIBLE TO UPDATE THE IMAGE WITH ID #${id} `,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string): Promise<ImageInterface> {
    try {
      const image = await this.modelImage.findByIdAndDelete(id);
      return image;
    } catch (error) {
      throw new HttpException(
        { error: `IMPOSIBLE TO DELETE THE IMAGE WITH ID #${id} ` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
