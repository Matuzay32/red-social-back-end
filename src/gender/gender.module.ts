import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Gender, GenderSchma } from './schemas/gender.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gender.name, schema: GenderSchma }]),
  ],
  controllers: [GenderController],
  providers: [GenderService],
})
export class GenderModule {}
