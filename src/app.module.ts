import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CountrysModule } from './countrys/countrys.module';
import { DistributionsModule } from './distributions/distributions.module';
import { SentimentalModule } from './sentimental/sentimental.module';
import { AlbumsModule } from './albums/albums.module';
import { ImagesModule } from './images/images.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/api'),
    AuthModule,
    ConfigModule.forRoot({ ignoreEnvFile: false, isGlobal: true }),
    CountrysModule,
    DistributionsModule,
    SentimentalModule,
    AlbumsModule,
    ImagesModule,
    PostsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
