import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, SchemaComment } from './schemas/comment.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: SchemaComment }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
