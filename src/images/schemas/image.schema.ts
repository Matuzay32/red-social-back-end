import mongoose, { HydratedDocument, mongo } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Distribution } from 'src/distributions/schemas/distribution.schema';
import { Album } from 'src/albums/schemas/album.schema';
export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {
  @Prop()
  name: String;

  @Prop()
  title: String;

  @Prop({ default: new Date(Date.now()) })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Distribution.name })
  distributionId: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
