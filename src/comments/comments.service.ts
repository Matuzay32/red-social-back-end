import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, DocumentComment } from './schemas/comment.schemas';
import mongoose, { Model } from 'mongoose';
@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private modelComment: Model<DocumentComment>,
  ) {}

  async create(CreateCommentDto: CreateCommentDto) {
    try {
      const COMMENT = await this.modelComment.create(CreateCommentDto);
      return COMMENT;
    } catch (error) {
      throw new HttpException(
        { reason: `IMPOSIBLE TO CREATE THE COMMENT` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const comments = await this.modelComment.aggregate([
        { $project: { __v: 0 } },

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
        { reason: `IMPOSIBLE TO FIND THE COMMENTS` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string) {
    try {
      const comment = await this.modelComment.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },

        { $project: { __v: 0 } },

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
      return comment;
    } catch (error) {
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE COMMENT with id  ${id} ` },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, UpdateCommentDto: UpdateCommentDto) {
    try {
      return this.modelComment.findByIdAndUpdate(id, UpdateCommentDto);
    } catch (error) {
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE COMMENT with id  ${id} ` },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string) {
    try {
      return this.modelComment.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(
        { reason: `IMPOSIBLE TO FIND THE COMMENT with id  ${id} ` },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
