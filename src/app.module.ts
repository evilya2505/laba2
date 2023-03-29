import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { RoomsDatasourceModule } from './datasource/roomsdatasource.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { FacilitiesDatasourceModule } from './datasource/facilitiesdatasource.module';
import { GuestsModule } from './guests/guests.module';
import { GuestsDatasourceModule } from './datasource/guestsdatasource.module';

@Module({
  imports: [RoomsModule, RoomsDatasourceModule, FacilitiesModule, FacilitiesDatasourceModule, GuestsModule, GuestsDatasourceModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
