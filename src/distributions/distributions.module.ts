import { Module } from '@nestjs/common';
import { DistributionsService } from './distributions.service';
import { DistributionsController } from './distributions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Distribution,
  DistributionSchema,
} from './schemas/distribution.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Distribution.name, schema: DistributionSchema },
    ]),
  ],
  controllers: [DistributionsController],
  providers: [DistributionsService],
})
export class DistributionsModule {}
