import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Country } from 'src/countrys/schemas/country.schemas';
import { Distribution } from 'src/distributions/schemas/distribution.schema';
import { Sentimental } from 'src/sentimental/schemas/sentimental.entity';
import { User } from 'src/users/schemas/user.schema';
export type ProfileDocument = HydratedDocument<Profile>;
@Schema()
export class Profile {
  @Prop({ required: true, default: new Date(Date.now()) })
  birthday: string;
  @Prop({ required: true, default: 'Hombre' })
  gender: string;
  @Prop({
    required: true,
    default:
      'https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14044.jpg',
  })
  image: string;
  @Prop({
    required: true,
    default:
      'https://cdn.pixabay.com/photo/2016/04/14/07/48/particles-1328400_960_720.jpg',
  })
  imageHeader: string;
  @Prop({ required: true, default: 'Title default' })
  title: string;
  @Prop({ required: true, default: 'Bio default' })
  bio: string;
  @Prop({ default: 0 })
  likes: string;
  @Prop({ default: 0 })
  dislikes: string;
  @Prop()
  publicEmail: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Sentimental.name })
  sentimentalId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Country.name })
  countryId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Distribution.name })
  distributionId: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
