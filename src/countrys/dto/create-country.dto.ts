import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCountryDto {
  @IsNotEmpty()
  name: String;
  @IsNotEmpty()
  preffix: String;
}
