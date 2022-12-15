import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: new Date(Date.now()) })
  createdAt: Date;

  @Prop({ default: 0 })
  isAdmin: 0;
}

export const UserSchema = SchemaFactory.createForClass(User);
