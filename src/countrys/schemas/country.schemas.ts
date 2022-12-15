import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type CountryDocument = HydratedDocument<Country>;

@Schema()
export class Country {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  preffix: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
