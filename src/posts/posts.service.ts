import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { DocumentComment, Comment } from 'src/comments/schemas/comment.schemas';
import { CreatePostIterface } from './create-post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/post.schema';
import { CreateCommentInterface } from '../comments/create-comment.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,

    @InjectModel(Comment.name) private commentModel: Model<DocumentComment>,
  ) {}

  async create(CreatePostDto: CreatePostDto): Promise<CreatePostIterface> {
    try {
      const album = await this.postModel.create(CreatePostDto);
      return album;
    } catch (error) {
      throw new HttpException(
        { reason: `IMPOSIBLE TO CREATE THE POST` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<CreatePostIterface[]> {
    try {
      const albums = await this.postModel.aggregate([
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
        { reason: `IMPOSIBLE TO FIND THE POSTS` },
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
    } catch (error) {
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THIS COMMENTS ` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string): Promise<CreatePostIterface[]> {
    try {
      const albums = await this.postModel.aggregate([
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
        { reason: `IMPOSIBLE TO FIND THE POST with id  ${id} ` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    UpdatePostDto: UpdatePostDto,
  ): Promise<CreatePostIterface> {
    try {
      return this.postModel.findByIdAndUpdate(id, UpdatePostDto);
    } catch (error) {
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE POST with id  ${id} ` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string): Promise<CreatePostIterface> {
    try {
      return this.postModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE POST with id  ${id} ` },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
