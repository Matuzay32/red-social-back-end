import { ObjectId } from 'mongoose';

export interface CreateAlbumInterface {
  title: String;

  userId: String;

  distributionId: String;

  imageId: ObjectId[];

  createdAt: Date;
}
