import { GuestsService } from './guests.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Guest } from './guest.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('guests')
@ApiTags('Гости')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}
  @ApiOperation({ summary: 'Получение информации обо всех гостях' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() request: any) {
    const { id } = request.user;

    return this.guestsService.findAll(id);
  }

  @ApiOperation({ summary: 'Получение информации о госте по id' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: any) {
    const user = request.user;

    return this.guestsService.findOne(+id, user.id);
  }

  @ApiOperation({ summary: 'Изменение информации о госте' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateGuest: Guest,
    @Req() request: any,
  ) {
    const user = request.user;

    return this.guestsService.update(+id, updateGuest, user.id);
  }

  @ApiOperation({ summary: 'Создание гостя' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createGuest: Guest, @Req() request: any) {
    const user = request.user;

    return this.guestsService.create(createGuest, user.id);
  }

  @ApiOperation({ summary: 'Удаление гостя по id' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: any) {
    const user = request.user;

    return this.guestsService.remove(+id, user.id);
  }
}
