import { ApiProperty } from '@nestjs/swagger';
import { Booking } from 'src/bookings/booking.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('facilities')
export class Facility {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: 'Сувенирная продукция', description: 'Название' })
  @Column({})
  name: string;
  @ApiProperty({ example: '1000', description: 'Цена' })
  @Column()
  price: number;
  @ManyToMany(() => Booking, (booking) => booking.facilities)
  bookings: Booking[];
}
