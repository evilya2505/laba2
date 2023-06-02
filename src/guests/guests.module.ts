import { Module } from '@nestjs/common';
import { GuestsController } from './guests.controller';
import { GuestsService } from './guests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from './guest.entity';
import { Booking } from 'src/bookings/booking.entity';
import { User } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [GuestsController],
  providers: [GuestsService],
  imports: [TypeOrmModule.forFeature([Guest, Booking, User]), UsersModule],
})
export class GuestsModule {}
