import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RoomDto {
  @ApiProperty({ example: 'Одноместный номер', description: 'Название номера' })
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1', description: 'Максимальное количество людей' })
  @IsNumber()
  @MinLength(1)
  @MaxLength(2)
  @IsNotEmpty()
  maxpeople: number;

  @ApiProperty({ example: '5000', description: 'Цена' })
  @IsNumber()
  @MinLength(3)
  @IsNotEmpty()
  price: number;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty({
    example:
      'В гостинице «Паллада» при одноместном размещении (площадь от 30 до 45 кв. метров) вы найдете широкие кровати.',
    description: 'Описание',
  })
  description: string;
}
