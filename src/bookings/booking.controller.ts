import { BookingsService } from './booking.service';
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
import { CreateBookingDto } from './dto/create-booking-dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('bookings')
@ApiTags('Бронирования')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}
  @ApiOperation({
    summary: 'Получение информации обо всех бронированиях пользователя',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Get()
  findAll(@Req() request: any) {
    const user = request.user;

    return this.bookingsService.findAll(user.id);
  }

  @ApiOperation({ summary: 'Получение неполной информации о бронировании' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Get('incomplete')
  findIncomplete(@Req() request: any) {
    const user = request.user;

    return this.bookingsService.findIncomplete(user.id);
  }

  @ApiOperation({ summary: 'Получение информации о бронировании по id' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: any) {
    const user = request.user;

    return this.bookingsService.findOne(+id, user.id);
  }

  @ApiOperation({ summary: 'Изменение информации о бронировании' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBooking: CreateBookingDto,
    @Req() request: any,
  ) {
    const user = request.user;

    return this.bookingsService.update(+id, updateBooking, user.id);
  }

  @ApiOperation({ summary: 'Создание бронирования' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createBooking: CreateBookingDto, @Req() request: any) {
    const user = request.user;

    return this.bookingsService.create(createBooking, user.id);
  }

  @ApiOperation({ summary: 'Удаление бронирования по id' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: any) {
    const user = request.user;

    return this.bookingsService.remove(+id, user.id);
  }
}
