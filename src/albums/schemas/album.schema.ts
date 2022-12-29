export type AlbumDocument = HydratedDocument<Album>;

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Distribution } from 'src/distributions/schemas/distribution.schema';
import { Comment } from 'src/comments/schemas/comment.schemas';
import { User } from 'src/users/schemas/user.schema';
@Schema({ versionKey: false })
export class Album {
  @Prop({ required: true, default: new Date(Date.now()) })
  title: String;

  @Prop({ required: true })
  content: String[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Distribution.name })
  distributionId: string;

  @Prop({ default: new Date(Date.now()) })
  createdAt: Date;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
