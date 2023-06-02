import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: '1', description: 'Номер бронирования' })
  @IsNumber()
  @IsNotEmpty()
  @MinLength(1)
  bookingnumber: number;

  @ApiProperty({
    example: '2012-04-23T18:25:43.511Z',
    description: 'Дата начала бронирования',
  })
  @IsDate()
  @IsNotEmpty()
  datefrom: Date;

  @ApiProperty({
    example: '2012-04-23T18:25:43.511Z',
    description: 'Дата окончания бронирования',
  })
  @IsDate()
  @IsNotEmpty()
  dateto: Date;

  @ApiProperty({
    example: [1, 2],
    description: 'Список идентификаторов гостей',
  })
  @IsNotEmpty()
  guests: number[];

  @ApiProperty({
    example: [1, 2],
    description: 'Список идентификаторов сервисов',
  })
  @IsNotEmpty()
  facilities: number[];

  @ApiProperty({ example: 1, description: 'Идентификатор типа комнаты' })
  @IsNumber()
  @IsNotEmpty()
  room: number;

  @ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
  user: number;
}
