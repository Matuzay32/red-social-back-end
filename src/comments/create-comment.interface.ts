import { ObjectId } from 'mongoose';

export interface CreateCommentInterface {
  userId: String;

  typeIdRef: ObjectId[];

  comentId: String;

  content: String;

  createdAt: Date;
}
