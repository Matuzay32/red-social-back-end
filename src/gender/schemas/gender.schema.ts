import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type GenderDocument = HydratedDocument<Gender>;

@Schema({ versionKey: false })
export class Gender {
  @Prop({ default: 'Man' })
  name: string;

  @Prop({ default: new Date(Date.now()) })
  createdAt: Date;
}
export const GenderSchma = SchemaFactory.createForClass(Gender);
