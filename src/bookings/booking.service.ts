import { Injectable } from '@nestjs/common';
import { Booking } from './booking.entity';
import { Guest } from 'src/guests/guest.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDto } from './dto/create-booking-dto';
import { Room } from 'src/rooms/room.entity';
import { Facility } from 'src/facilities/facility.entity';
import { IncompleteBookingDto } from './dto/incomplete-booking-dto ';
import { User } from 'src/users/users.entity';

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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(bookingDto: CreateBookingDto, userId: number): Promise<Booking> {
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

    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
      },
    });

    const facilities = await this.facilityRepository.findBy({
      id: In(bookingDto.facilities),
    });

    booking.guests = guests;
    booking.room = room;
    booking.facilities = facilities;
    booking.user = user;

    await this.bookingRepository.save(booking);

    return booking;
  }

  async findAll(userId: number): Promise<Booking[]> {
    const bookings = await this.bookingRepository.find({
      relations: {
        guests: true,
        room: true,
        facilities: true,
        user: true,
      },
    });

    let result = [];

    bookings.map((booking) => {
      if (booking?.user?.id == userId) {
        result.push(booking);
        delete booking.user.password;
      }
    });

    return result;
  }

  async findOne(id: number, userId: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: { guests: true, room: true, facilities: true, user: true },
    });

    if (booking.user.id == userId) return booking;
  }

  async update(id: number, updatedBooking: CreateBookingDto, userId: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: { guests: true, room: true, facilities: true, user: true },
    });
    if (booking.user.id == userId) {
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
  }

  async remove(id: number, userId: number): Promise<Boolean> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: { guests: true, room: true, facilities: true, user: true },
    });

    if (booking.user.id == userId) {
      this.bookingRepository.delete({ id });

      return true;
    }

    return false;
  }

  async findIncomplete(userId: number): Promise<IncompleteBookingDto[]> {
    const bookings = await this.bookingRepository.find({
      relations: {
        user: true,
      },
    });

    const incompleteBookings: IncompleteBookingDto[] = bookings.map(
      (booking) => {
        const incompleteBooking = new IncompleteBookingDto();

        incompleteBooking.bookingnumber = booking.bookingnumber;
        incompleteBooking.dateto = booking.dateto;
        incompleteBooking.datefrom = booking.datefrom;
        incompleteBooking.user = booking.user;

        return incompleteBooking;
      },
    );

    let result = [];

    incompleteBookings.map((booking) => {
      if (booking?.user?.id == userId) {
        result.push(booking);
        delete booking.user.password;
      }
    });

    return result;
  }
}
