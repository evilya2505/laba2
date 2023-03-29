import { Module } from '@nestjs/common';
import { GuestsController } from './guests.controller';
import { GuestsService } from './guests.service';
import { GuestsDatasourceModule } from 'src/datasource/guestsdatasource.module';

@Module({
  controllers: [GuestsController],
  providers: [GuestsService],
  imports: [GuestsDatasourceModule],
})
export class GuestsModule {}
