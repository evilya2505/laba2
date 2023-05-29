import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: '1', description: 'Номер бронирования' })
  bookingnumber: number;
  @ApiProperty({
    example: '2012-04-23T18:25:43.511Z',
    description: 'Дата начала бронирования',
  })
  datefrom: Date;
  @ApiProperty({
    example: '2012-04-23T18:25:43.511Z',
    description: 'Дата окончания бронирования',
  })
  dateto: Date;
  @ApiProperty({
    example: [1, 2],
    description: 'Список идентификаторов гостей',
  })
  guests: number[];
  @ApiProperty({
    example: [1, 2],
    description: 'Список идентификаторов сервисов',
  })
  facilities: number[];
  @ApiProperty({ example: 1, description: 'Идентификатор типа комнаты' })
  room: number;
  @ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
  user: number;
}
