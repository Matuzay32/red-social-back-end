import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Country } from 'src/countrys/schemas/country.schemas';

export type UserDocument = HydratedDocument<User>;

@Schema()
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

  @Prop({ default: new Date(Date.now()) })
  createdAt: Date;

  @Prop({ default: 0 })
  isAdmin: 0;
}

export const UserSchema = SchemaFactory.createForClass(User);
