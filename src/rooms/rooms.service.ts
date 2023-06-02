import { Injectable } from '@nestjs/common';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomDto } from './dto/room-dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create(newGuest: RoomDto): Promise<RoomDto> {
    const room = this.roomRepository.create();
    room.name = newGuest.name;
    room.maxpeople = newGuest.maxpeople;
    room.description = newGuest.description;
    room.price = newGuest.price;

    await this.roomRepository.save(room);
    return room;
  }

  async findOne(id: number): Promise<RoomDto> {
    return this.roomRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<RoomDto[]> {
    const guests = await this.roomRepository.find({
      relations: {
        bookings: false,
      },
    });
    return guests;
  }

  async update(id: number, updatedRoom: RoomDto) {
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
