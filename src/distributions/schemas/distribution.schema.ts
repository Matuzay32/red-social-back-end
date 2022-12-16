import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DistributionDocument = HydratedDocument<Distribution>;

@Schema()
export class Distribution {
  @Prop({ required: true })
  name: string;
}

export const DistributionSchema = SchemaFactory.createForClass(Distribution);
