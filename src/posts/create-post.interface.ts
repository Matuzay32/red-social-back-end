import { ObjectId } from 'mongoose';

export interface CreatePostIterface {
  title: String;

  userId: String;

  distributionId: String;

  imageId: (ObjectId | String)[];

  createdAt: Date;
}
