import { Module } from '@nestjs/common';
import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { FacilitiesDatasourceModule } from 'src/datasource/facilitiesdatasource.module';

@Module({
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
  imports: [FacilitiesDatasourceModule],
})

export class FacilitiesModule {}
