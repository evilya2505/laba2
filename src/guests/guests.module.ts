import { Module } from '@nestjs/common';
import { GuestsController } from './guests.controller';
import { GuestsService } from './guests.service';
import { GuestsDatasourceModule } from 'src/datasource/guestsdatasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guest } from './guest.entity';
import { Booking } from 'src/bookings/booking.entity';

@Module({
  controllers: [GuestsController],
  providers: [GuestsService],
  imports: [TypeOrmModule.forFeature([Guest, Booking])],
})

export class GuestsModule {}


