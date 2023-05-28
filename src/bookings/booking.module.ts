import { ClassProvider, Module } from '@nestjs/common';
import { BookingsController } from './booking.controller';
import { BookingsService } from './booking.service';
// import { BookingsDatasourceModule } from 'src/datasource/bookingsdatasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Guest } from 'src/guests/guest.entity';
import { Room } from 'src/rooms/room.entity';
import { Facility } from 'src/facilities/facility.entity';
import { User } from 'src/users/users.entity';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports: [TypeOrmModule.forFeature([Booking, Guest, Room, Facility, User])],
})
export class BookingsModule {}
