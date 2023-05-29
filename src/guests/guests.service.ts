import { HttpStatus, Injectable } from '@nestjs/common';
import { Guest } from './guest.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(newGuest: Guest, userId: number): Promise<Guest> {
    const guest = this.guestRepository.create();

    guest.firstname = newGuest.firstname;
    guest.lastname = newGuest.lastname;
    guest.phonenumber = newGuest.phonenumber;
    guest.emailaddress = newGuest.emailaddress;

    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
      },
    });

    guest.user = user;

    await this.guestRepository.save(guest);

    return guest;
  }

  async findOne(id: number, userId: number): Promise<Guest> {
    const guest = await this.guestRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (guest?.user?.id == userId) return guest;
  }

  async findAll(userId: number): Promise<Guest[]> {
    const guests = await this.guestRepository.find({
      relations: {
        bookings: false,
        user: true,
      },
    });

    let result = [];

    guests.map((guest) => {
      if (guest?.user?.id == userId) {
        result.push(guest);
      }
    });

    return result;
  }

  async update(id: number, updatedAuthor: Guest, userId: number) {
    const guest = await this.guestRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (guest?.user?.id == userId) {
      guest.firstname = updatedAuthor.firstname;
      guest.lastname = updatedAuthor.lastname;
      guest.phonenumber = updatedAuthor.phonenumber;
      guest.emailaddress = updatedAuthor.emailaddress;

      await this.guestRepository.save(guest);

      return guest;
    }
  }

  async remove(id: number, userId: number): Promise<Boolean> {
    const guest = await this.guestRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (guest?.user?.id == userId) {
      this.guestRepository.delete({ id });

      return true;
    }

    return false;
  }
}
