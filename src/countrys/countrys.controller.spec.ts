import { Test, TestingModule } from '@nestjs/testing';
import { CountrysController } from './countrys.controller';
import { CountrysService } from './countrys.service';

describe('CountrysController', () => {
  let controller: CountrysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountrysController],
      providers: [CountrysService],
    }).compile();

    controller = module.get<CountrysController>(CountrysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
