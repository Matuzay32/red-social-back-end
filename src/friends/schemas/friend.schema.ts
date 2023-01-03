import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type FriendDocument = HydratedDocument<Friend>;

@Schema({ versionKey: false })
export class Friend {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  senderId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  receptorId: string;

  @Prop({ type: Boolean, default: false })
  isAccepted: boolean;

  @Prop({ type: Boolean, default: false })
  isReaded: boolean;

  @Prop({ type: Date, default: new Date(Date.now()) })
  createdAt: Date;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
