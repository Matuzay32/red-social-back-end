import { ObjectId } from 'mongoose';
export class CreateCommentDto {
  userId: String;

  typeIdRef: ObjectId[];

  comentId: String;

  content: String;
}
