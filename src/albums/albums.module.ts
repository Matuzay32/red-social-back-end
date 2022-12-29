import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './schemas/album.schema';
import { Comment, SchemaComment } from '../comments/schemas/comment.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Album.name, schema: AlbumSchema },
      { name: Comment.name, schema: SchemaComment },
    ]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
