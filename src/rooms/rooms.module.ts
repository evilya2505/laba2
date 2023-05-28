import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/booking.entity';
import { Room } from './room.entity';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [TypeOrmModule.forFeature([Booking, Room])],
})
export class RoomsModule {}
