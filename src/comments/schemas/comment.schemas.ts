import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Album } from 'src/albums/schemas/album.schema';
import { Image } from 'src/images/schemas/image.schema';
import { Post } from 'src/posts/schemas/post.schema';

export type DocumentComment = HydratedDocument<Comment>;
@Schema()
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: String;

  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: User.name },
    { type: mongoose.Schema.Types.ObjectId, ref: Album.name },
    { type: mongoose.Schema.Types.ObjectId, ref: Image.name },
    { type: mongoose.Schema.Types.ObjectId, ref: User.name },
    { type: mongoose.Schema.Types.ObjectId, ref: Post.name },
  ])
  typeIdRef: ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Comment.name })
  comentId: String;

  @Prop({ required: true })
  content: String;

  @Prop({ default: new Date(Date.now()) })
  createdAt: Date;
}

export const SchemaComment = SchemaFactory.createForClass(Comment);
