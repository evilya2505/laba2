import { HttpStatus, Injectable } from '@nestjs/common';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create(newGuest: Room): Promise<Room> {
    const room = this.roomRepository.create();
    room.name = newGuest.name;
    room.maxpeople = newGuest.maxpeople;
    room.description = newGuest.description;
    room.price = newGuest.price;

    await this.roomRepository.save(room);
    return room;
  }

  async findOne(id: number): Promise<Room> {
    return this.roomRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<Room[]> {
    const guests = await this.roomRepository.find({
      relations: {
        bookings: false,
      },
    });
    return guests;
  }

  async update(id: number, updatedRoom: Room) {
    const room = await this.roomRepository.findOne({ where: { id } });
    room.name = updatedRoom.name;
    room.maxpeople = updatedRoom.maxpeople;
    room.description = updatedRoom.description;
    room.price = updatedRoom.price;
    await this.roomRepository.save(room);
    return room;
  }

  remove(id: number) {
    this.roomRepository.delete({ id });
  }
}
