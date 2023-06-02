import { User } from 'src/users/users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class IncompleteBookingDto {
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

  @ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
  user: User;
}
