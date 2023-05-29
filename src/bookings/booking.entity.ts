import { ApiProperty } from '@nestjs/swagger';
import { Facility } from 'src/facilities/facility.entity';
import { Guest } from 'src/guests/guest.entity';
import { Room } from 'src/rooms/room.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('bookings')
export class Booking {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: '1', description: 'Номер бронирования' })
  @Column({})
  bookingnumber: number;
  @ApiProperty({
    example: '2012-04-23T18:25:43.511Z',
    description: 'Дата создания бронирования',
  })
  @Column()
  createdate: Date;
  @ApiProperty({
    example: '2012-04-23T18:25:43.511Z',
    description: 'Дата начала бронирования',
  })
  @Column()
  datefrom: Date;
  @ApiProperty({
    example: '2012-04-23T18:25:43.511Z',
    description: 'Дата окончания бронирования',
  })
  @Column()
  dateto: Date;
  @ManyToMany(() => Guest, { cascade: true })
  @JoinTable({
    name: 'booking_guest',
    joinColumn: { name: 'booking_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'guest_id' },
  })
  guests: Guest[];

  @ManyToOne(() => Room, (room: Room) => room.bookings)
  room: Room;

  @ManyToMany(() => Facility, { cascade: true })
  @JoinTable({
    name: 'booking_facility',
    joinColumn: { name: 'booking_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'facility_id' },
  })
  facilities: Facility[];
  @ManyToOne(() => User, (user: User) => user.bookings)
  user: User;
}
