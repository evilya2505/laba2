import { ApiProperty } from '@nestjs/swagger';
import { Booking } from 'src/bookings/booking.entity';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rooms')
export class Room {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: 'Одноместный номер', description: 'Название номера' })
  @Column({})
  name: string;
  @ApiProperty({ example: '1', description: 'Максимальное количество людей' })
  @Column()
  maxpeople: number;
  @ApiProperty({ example: '5000', description: 'Цена' })
  @Column()
  price: number;
  @ApiProperty({
    example:
      'В гостинице «Паллада» при одноместном размещении (площадь от 30 до 45 кв. метров) вы найдете широкие кровати.',
    description: 'Описание',
  })
  @Column()
  description: string;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];
}
