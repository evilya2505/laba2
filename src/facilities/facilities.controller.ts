import { FacilitiesService } from './facilities.service';
import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { Facility } from './facility.entity';

@Controller('facilites')
export class FacilitiesController {
  constructor(private readonly facilitesService: FacilitiesService) {}

    @Get()
    findAll() {
        return this.facilitesService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.facilitesService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateFacility: Facility) {
        return this.facilitesService.update(+id, updateFacility);
    }

    @Post()
    create(@Body() createRoom: Facility) {
        return this.facilitesService.create(createRoom);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.facilitesService.remove(+id);
    }
}

