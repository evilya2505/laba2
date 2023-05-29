import { Injectable } from '@nestjs/common';
import { Facility } from './facility.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacilityDto } from './dto/facility-dto';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(Facility)
    private readonly facilityRepository: Repository<Facility>,
  ) {}

  async create(newFacility: FacilityDto): Promise<FacilityDto> {
    const facility = this.facilityRepository.create();
    facility.name = newFacility.name;
    facility.price = newFacility.price;

    await this.facilityRepository.save(facility);
    return facility;
  }

  async findOne(id: number): Promise<FacilityDto> {
    return this.facilityRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<FacilityDto[]> {
    const guests = await this.facilityRepository.find({
      relations: {
        bookings: false,
      },
    });
    return guests;
  }

  async update(id: number, updatedFacility: FacilityDto) {
    const facility = await this.facilityRepository.findOne({ where: { id } });
    facility.name = updatedFacility.name;
    facility.price = updatedFacility.price;

    await this.facilityRepository.save(facility);
    return facility;
  }

  remove(id: number) {
    this.facilityRepository.delete({ id });
  }
}
