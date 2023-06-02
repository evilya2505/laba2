import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/booking.entity';
import { User } from './users.entity';
import { JwtStrategy } from 'src/strategy';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  imports: [TypeOrmModule.forFeature([Booking, User])],
  exports: [UsersService],
})
export class UsersModule {}
