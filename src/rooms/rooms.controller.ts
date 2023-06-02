import { RoomsService } from './rooms.service';
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
import { Room } from './room.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoomDto } from './dto/room-dto';

@Controller('rooms')
@ApiTags('Комнаты')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
  @ApiOperation({ summary: 'Получение информации обо всех комнатах' })
  @UsePipes(ValidationPipe)
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @ApiOperation({ summary: 'Получение информации о комнате по id' })
  @UsePipes(ValidationPipe)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Изменение информации о комнате' })
  @UsePipes(ValidationPipe)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoom: RoomDto) {
    return this.roomsService.update(+id, updateRoom);
  }

  @ApiOperation({ summary: 'Создание комнаты' })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createRoom: RoomDto) {
    return this.roomsService.create(createRoom);
  }

  @ApiOperation({ summary: 'Удаление комнаты по id' })
  @UsePipes(ValidationPipe)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
