import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CountrysService } from './countrys.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CreateCountryInterface } from './countrys.interface';
@ApiTags('countrys')
@ApiBearerAuth()
@Controller('countrys')
export class CountrysController {
  constructor(private readonly countrysService: CountrysService) {}

  @Post()
  create(
    @Body() createCountryDto: CreateCountryDto,
  ): Promise<CreateCountryInterface> {
    return this.countrysService.create(createCountryDto);
  }

  @Get()
  findAll(): Promise<CreateCountryInterface[]> {
    return this.countrysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CreateCountryInterface> {
    return this.countrysService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ): Promise<CreateCountryInterface> {
    return this.countrysService.update(id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<CreateCountryInterface> {
    return this.countrysService.remove(id);
  }
}
