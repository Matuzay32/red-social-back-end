import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Country } from 'src/countrys/schemas/country.schemas';
import { Distribution } from 'src/distributions/schemas/distribution.schema';
import { Gender } from 'src/gender/schemas/gender.schema';
import { Sentimental } from 'src/sentimental/schemas/sentimental.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ default: new Date(Date.now()) })
  birthday: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Country.name })
  countryId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Gender.name })
  genderId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Sentimental.name })
  sentimentalId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Distribution.name })
  distributionId: string;

  @Prop({ default: new Date(Date.now()) })
  createdAt: Date;

  @Prop({ default: 0 })
  isAdmin: 0;
}

export const UserSchema = SchemaFactory.createForClass(User);
