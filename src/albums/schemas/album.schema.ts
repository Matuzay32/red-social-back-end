export type AlbumDocument = HydratedDocument<Album>;

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Distribution } from 'src/distributions/schemas/distribution.schema';
import { Comment } from 'src/comments/schemas/comment.schemas';
import { User } from 'src/users/schemas/user.schema';
import { Image } from 'src/images/schemas/image.schema';
@Schema({ versionKey: false })
export class Album {
  @Prop({ required: true })
  title: String;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Distribution.name })
  distributionId: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Image.name }])
  imageId: ObjectId[];

  @Prop({ default: new Date(Date.now()) })
  createdAt: Date;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
