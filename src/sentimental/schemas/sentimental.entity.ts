import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SentimentalDocument = HydratedDocument<Sentimental>;

@Schema()
export class Sentimental {
  @Prop({ required: true, default: 'soltero' })
  name: string;
}

export const SentimentalSchema = SchemaFactory.createForClass(Sentimental);
