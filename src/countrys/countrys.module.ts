import { Module } from '@nestjs/common';
import { CountrysService } from './countrys.service';
import { CountrysController } from './countrys.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from './schemas/country.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],

  controllers: [CountrysController],
  providers: [CountrysService],
})
export class CountrysModule {}
