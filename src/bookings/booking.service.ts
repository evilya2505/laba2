import { Injectable } from '@nestjs/common';
import { Booking } from './booking.entity';
import { Guest } from 'src/guests/guest.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDto } from './dto/create-booking-dto';
import { Room } from 'src/rooms/room.entity';
import { Facility } from 'src/facilities/facility.entity';
import { IncompleteBookingDto } from './dto/incomplete-booking-dto ';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Facility)
    private readonly facilityRepository: Repository<Facility>,
  ) {}

  async create(bookingDto: CreateBookingDto): Promise<Booking> {
    const booking = this.bookingRepository.create();
    booking.bookingnumber = bookingDto.bookingnumber;
    booking.createdate = new Date();
    booking.datefrom = bookingDto.datefrom;
    booking.dateto = bookingDto.dateto;

    const guests = await this.guestRepository.findBy({
      id: In(bookingDto.guests),
    });

    const room = await this.roomRepository.findOne({
      where: {
        id: bookingDto.room,
      },
    });

    const facilities = await this.facilityRepository.findBy({
      id: In(bookingDto.facilities),
    });

    booking.guests = guests;
    booking.room = room;
    booking.facilities = facilities;

    console.log(booking);
    await this.bookingRepository.save(booking);

    return booking;
  }

  async findAll(): Promise<Booking[]> {
    const booking = await this.bookingRepository.find({
      relations: {
        guests: true,
        room: true,
        facilities: true,
      },
    });
    return booking;
  }

  findOne(id: number): Promise<Booking> {
    return this.bookingRepository.findOne({
      where: { id },
      relations: { guests: true, room: true, facilities: true },
    });
  }

  async update(id: number, updatedBooking: CreateBookingDto) {
    const booking = await this.bookingRepository.findOne({ where: { id } });

    booking.bookingnumber = updatedBooking.bookingnumber;
    booking.datefrom = updatedBooking.datefrom;
    booking.dateto = updatedBooking.dateto;

    const guests = await this.guestRepository.findBy({
      id: In(updatedBooking.guests),
    });

    const room = await this.roomRepository.findOne({
      where: {
        id: updatedBooking.room,
      },
    });

    const facilities = await this.facilityRepository.findBy({
      id: In(updatedBooking.facilities),
    });

    booking.guests = guests;
    booking.room = room;
    booking.facilities = facilities;

    await this.bookingRepository.save(booking);
    return booking;
  }

  remove(id: number) {
    this.bookingRepository.delete({ id });
  }

  async findIncomplete(): Promise<IncompleteBookingDto[]> {
    const bookings = await this.bookingRepository.find();

    const incompleteBookings: IncompleteBookingDto[] = bookings.map(
      (booking) => {
        const incompleteBooking = new IncompleteBookingDto();

        incompleteBooking.bookingnumber = booking.bookingnumber;
        incompleteBooking.dateto = booking.dateto;
        incompleteBooking.datefrom = booking.datefrom;

        return incompleteBooking;
      },
    );

    return incompleteBookings;
  }
}
