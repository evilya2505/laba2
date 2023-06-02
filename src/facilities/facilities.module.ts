import { Module } from '@nestjs/common';
import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
// import { FacilitiesDatasourceModule } from 'src/datasource/facilitiesdatasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/booking.entity';
import { Facility } from './facility.entity';

@Module({
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
  imports: [TypeOrmModule.forFeature([Booking, Facility])],
})
export class FacilitiesModule {}
