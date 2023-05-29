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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { GuestDto } from './dto/guest-dto';

@Controller('guests')
@ApiTags('Гости')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}
  @ApiOperation({
    summary: 'Получение информации обо всех гостях пользователя',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Get()
  findAll(@Req() request: any) {
    const { id } = request.user;

    return this.guestsService.findAll(id);
  }

  @ApiOperation({ summary: 'Получение информации о госте по id' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: any) {
    const user = request.user;

    return this.guestsService.findOne(+id, user.id);
  }

  @ApiOperation({ summary: 'Изменение информации о госте' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateGuest: GuestDto,
    @Req() request: any,
  ) {
    const user = request.user;

    return this.guestsService.update(+id, updateGuest, user.id);
  }

  @ApiOperation({ summary: 'Создание гостя' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createGuest: GuestDto, @Req() request: any) {
    const user = request.user;

    return this.guestsService.create(createGuest, user.id);
  }

  @ApiOperation({ summary: 'Удаление гостя по id' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: any) {
    const user = request.user;

    return this.guestsService.remove(+id, user.id);
  }
}
