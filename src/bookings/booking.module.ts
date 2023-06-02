import { Module } from '@nestjs/common';
import { BookingsController } from './booking.controller';
import { BookingsService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Guest } from 'src/guests/guest.entity';
import { Room } from 'src/rooms/room.entity';
import { Facility } from 'src/facilities/facility.entity';
import { User } from 'src/users/users.entity';
import { JwtStrategy } from 'src/strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([Booking, Guest, Room, Facility, User]),
    UsersModule,
  ],
})
export class BookingsModule {}
