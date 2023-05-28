import { GuestsService } from './guests.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Guest } from './guest.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('guests')
@ApiTags('Гости')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}
  @ApiOperation({ summary: 'Получение информации обо всех гостях' })
  @Get()
  findAll() {
    return this.guestsService.findAll();
  }

  @ApiOperation({ summary: 'Получение информации о госте по id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Изменение информации о госте' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateGuest: Guest) {
    return this.guestsService.update(+id, updateGuest);
  }

  @ApiOperation({ summary: 'Создание гостя' })
  @Post()
  create(@Body() createGuest: Guest) {
    return this.guestsService.create(createGuest);
  }

  @ApiOperation({ summary: 'Удаление гостя по id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestsService.remove(+id);
  }
}
