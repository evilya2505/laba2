import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class FacilityDto {
  @ApiProperty({ example: 'Сувенирная продукция', description: 'Название' })
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1000', description: 'Цена' })
  @IsNumber()
  @MinLength(2)
  @IsNotEmpty()
  price: number;
}
