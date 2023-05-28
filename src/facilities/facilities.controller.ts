import { FacilitiesService } from './facilities.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Facility } from './facility.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('facilites')
@ApiTags('Сервисы')
export class FacilitiesController {
  constructor(private readonly facilitesService: FacilitiesService) {}
  @ApiOperation({ summary: 'Получение информации обо всех сервисах' })
  @Get()
  findAll() {
    return this.facilitesService.findAll();
  }

  @ApiOperation({ summary: 'Получение информации о сервисе по id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilitesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Изменение информации о сервисе' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateFacility: Facility) {
    return this.facilitesService.update(+id, updateFacility);
  }

  @ApiOperation({ summary: 'Создание сервиса' })
  @Post()
  create(@Body() createRoom: Facility) {
    return this.facilitesService.create(createRoom);
  }

  @ApiOperation({ summary: 'Удаление сервиса по id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilitesService.remove(+id);
  }
}
