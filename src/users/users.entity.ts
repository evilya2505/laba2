import { ApiProperty } from '@nestjs/swagger';
import { Booking } from 'src/bookings/booking.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { Guest } from 'src/guests/guest.entity';

@Entity('users')
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ example: 'Анастасия', description: 'Имя' })
  @Column({})
  firstname: string;
  @ApiProperty({ example: 'Федорова', description: 'Фамилия' })
  @Column()
  lastname: string;
  @ApiProperty({ example: 'test@mail.ru', description: 'Электронная почта' })
  @Column()
  email: string;
  @ApiProperty({ example: '123', description: 'Пароль' })
  @Column()
  password: string;
  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
  @OneToMany(() => Guest, (guest) => guest.user)
  guests: Guest[];
}
