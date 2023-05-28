import { ApiProperty } from '@nestjs/swagger';
import { Booking } from 'src/bookings/booking.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('guests')
export class Guest {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: 'Макар', description: 'Имя' })
  @Column({})
  firstname: string;
  @ApiProperty({ example: 'Соловьев', description: 'Фамилия' })
  @Column()
  lastname: string;
  @ApiProperty({ example: '571177516610', description: 'Номер телефона' })
  @Column()
  phonenumber: string;
  @ApiProperty({ example: 'hedwig@live.com', description: 'Электронная почта' })
  @Column()
  emailaddress: string;
  @ManyToMany(() => Booking, (booking) => booking.guests)
  bookings: Booking[];
}
