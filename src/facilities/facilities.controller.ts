import { FacilitiesService } from './facilities.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FacilityDto } from './dto/facility-dto';

@Controller('facilites')
@ApiTags('Сервисы')
export class FacilitiesController {
  constructor(private readonly facilitesService: FacilitiesService) {}
  @ApiOperation({ summary: 'Получение информации обо всех сервисах' })
  @UsePipes(ValidationPipe)
  @Get()
  findAll() {
    return this.facilitesService.findAll();
  }

  @ApiOperation({ summary: 'Получение информации о сервисе по id' })
  @UsePipes(ValidationPipe)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilitesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Изменение информации о сервисе' })
  @UsePipes(ValidationPipe)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateFacility: FacilityDto) {
    return this.facilitesService.update(+id, updateFacility);
  }

  @ApiOperation({ summary: 'Создание сервиса' })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createRoom: FacilityDto) {
    return this.facilitesService.create(createRoom);
  }

  @ApiOperation({ summary: 'Удаление сервиса по id' })
  @UsePipes(ValidationPipe)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilitesService.remove(+id);
  }
}
