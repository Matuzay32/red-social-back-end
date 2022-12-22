import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DistributionDocument = HydratedDocument<Distribution>;

@Schema({ versionKey: false })
export class Distribution {
  @Prop({ required: true })
  name: string;
}

export const DistributionSchema = SchemaFactory.createForClass(Distribution);
