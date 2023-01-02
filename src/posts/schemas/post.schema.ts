import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Distribution } from 'src/distributions/schemas/distribution.schema';
import { User } from 'src/users/schemas/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({ versionKey: false })
export class Post {
  @Prop({ required: true })
  title: String;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Distribution.name })
  distributionId: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'images' }])
  imageId: (ObjectId | string)[];

  @Prop({ default: new Date(Date.now()) })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
