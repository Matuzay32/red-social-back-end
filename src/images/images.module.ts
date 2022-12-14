import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './schemas/image.schema';

import { SchemaComment, Comment } from '../comments/schemas/comment.schemas';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Image.name, schema: ImageSchema },
      { name: Comment.name, schema: SchemaComment },
    ]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
