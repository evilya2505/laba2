import { ForbiddenException, Injectable } from '@nestjs/common';
import { Guest } from './guest.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { GuestDto } from './dto/guest-dto';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>,
    private readonly usersService: UsersService,
  ) {}

  async create(newGuest: GuestDto, userId: number): Promise<Guest> {
    const guest = this.guestRepository.create();

    guest.firstname = newGuest.firstname;
    guest.lastname = newGuest.lastname;
    guest.phonenumber = newGuest.phonenumber;
    guest.emailaddress = newGuest.emailaddress;

    const user = await this.usersService.publicUser(userId);

    guest.user = user;

    await this.guestRepository.save(guest);

    return guest;
  }

  async findOne(id: number, userId: number): Promise<GuestDto> {
    const guest = await this.guestRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (guest?.user?.id == userId) {
      guest.user = await this.usersService.publicUser(userId);

      return guest;
    } else {
      throw new ForbiddenException('Нет прав для просмотра гостя.');
    }
  }

  async findAll(userId: number): Promise<GuestDto[]> {
    const guests = await this.guestRepository.find({
      relations: {
        bookings: false,
        user: true,
      },
    });

    let result = [];

    guests.map(async (guest) => {
      if (guest?.user?.id == userId) {
        guest.user = await this.usersService.publicUser(userId);
        result.push(guest);
      }
    });

    return result;
  }

  async update(id: number, updatedAuthor: GuestDto, userId: number) {
    const guest = await this.guestRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (guest?.user?.id == userId) {
      guest.firstname = updatedAuthor.firstname;
      guest.lastname = updatedAuthor.lastname;
      guest.phonenumber = updatedAuthor.phonenumber;
      guest.emailaddress = updatedAuthor.emailaddress;
      guest.user = await this.usersService.publicUser(userId);

      await this.guestRepository.save(guest);

      return guest;
    } else {
      throw new ForbiddenException(
        'Нет прав для изменения информации о госте.',
      );
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
    } else {
      throw new ForbiddenException('Нет прав для удаления гостя.');
    }
  }
}
