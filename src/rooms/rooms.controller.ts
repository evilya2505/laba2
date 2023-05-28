import { RoomsService } from './rooms.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Room } from './room.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('rooms')
@ApiTags('Комнаты')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
  @ApiOperation({ summary: 'Получение информации обо всех комнатах' })
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @ApiOperation({ summary: 'Получение информации о комнате по id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Изменение информации о комнате' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoom: Room) {
    return this.roomsService.update(+id, updateRoom);
  }

  @ApiOperation({ summary: 'Создание комнаты' })
  @Post()
  create(@Body() createRoom: Room) {
    return this.roomsService.create(createRoom);
  }

  @ApiOperation({ summary: 'Удаление комнаты по id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
