import { HttpStatus, Injectable } from '@nestjs/common';
import { Guest } from './guest.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
  ) {}

  async create(newGuest: Guest): Promise<Guest> {
    const guest = this.guestRepository.create();
    guest.firstname = newGuest.firstname;
    guest.lastname = newGuest.lastname;
    guest.phonenumber = newGuest.phonenumber;
    guest.emailaddress = newGuest.emailaddress;

    await this.guestRepository.save(guest);
    return guest;
  }

  async findOne(id: number): Promise<Guest> {
    return this.guestRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<Guest[]> {
    const guests = await this.guestRepository.find({
      relations: {
        bookings: false,
      },
    });
    return guests;
  }

  async update(id: number, updatedAuthor: Guest) {
    const guest = await this.guestRepository.findOne({ where: { id } });
    guest.firstname = updatedAuthor.firstname;
    guest.lastname = updatedAuthor.lastname;
    guest.phonenumber = updatedAuthor.phonenumber;
    guest.emailaddress = updatedAuthor.emailaddress;
    await this.guestRepository.save(guest);
    return guest;
  }

  remove(id: number) {
    this.guestRepository.delete({ id });
  }
}
