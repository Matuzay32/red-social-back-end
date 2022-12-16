import { Module } from '@nestjs/common';
import { SentimentalService } from './sentimental.service';
import { SentimentalController } from './sentimental.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SentimentalSchema, Sentimental } from './schemas/sentimental.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sentimental.name, schema: SentimentalSchema },
    ]),
  ],
  controllers: [SentimentalController],
  providers: [SentimentalService],
})
export class SentimentalModule {}
