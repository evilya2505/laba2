import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomsDatasourceModule } from 'src/datasource/roomsdatasource.module';
@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [RoomsDatasourceModule],
})
export class RoomsModule {}
