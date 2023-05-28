import { BookingsService } from './booking.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('bookings')
@ApiTags('Бронирования')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}
  @ApiOperation({ summary: 'Получение информации обо всех бронированиях' })
  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @ApiOperation({ summary: 'Получение неполной информации о бронировании' })
  @Get('incomplete')
  findIncomplete() {
    return this.bookingsService.findIncomplete();
  }

  @ApiOperation({ summary: 'Получение информации о бронировании по id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Изменение информации о бронировании' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBooking: CreateBookingDto) {
    return this.bookingsService.update(+id, updateBooking);
  }

  @ApiOperation({ summary: 'Создание бронирования' })
  @Post()
  create(@Body() createBooking: CreateBookingDto) {
    return this.bookingsService.create(createBooking);
  }

  @ApiOperation({ summary: 'Удаление бронирования по id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }
}
