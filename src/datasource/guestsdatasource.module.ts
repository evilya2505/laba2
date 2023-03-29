import { Module } from '@nestjs/common';
import { GuestsDatasourceService } from './guestsdatasource.service';

@Module({
  providers: [GuestsDatasourceService], 
  exports: [GuestsDatasourceService], 
})

export class GuestsDatasourceModule {}
