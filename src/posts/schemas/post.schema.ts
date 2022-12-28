import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Distribution } from 'src/distributions/schemas/distribution.schema';
import { User } from 'src/users/schemas/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({ versionKey: false })
export class Post {
  @Prop()
  title: String;

  @Prop()
  content: String[];

  @Prop({ default: new Date(Date.now()) })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Distribution.name })
  distributionId: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
