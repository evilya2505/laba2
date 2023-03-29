import { HttpStatus, Injectable } from "@nestjs/common";
import { GuestsDatasourceService } from "src/datasource/guestsdatasource.service";
import { Guest } from "./guest.entity";

@Injectable()
export class GuestsService {
    constructor(private readonly datasourceService: GuestsDatasourceService) {}

    create(guest: Guest) {
        this.datasourceService.getGuests().push(guest);

        return guest;
    }

    findOne(id: number) {
        return this.datasourceService
          .getGuests()
          .find((guest) => guest.id === id);
      } 

    findAll(): Guest[] {
        return this.datasourceService.getGuests();
    }   
    
    update(id: number, updatedGuest: Guest) {
        const index = this.datasourceService
            .getGuests()
            .findIndex((guest) => guest.id === id);
        this.datasourceService.getGuests()[index] = updatedGuest;

        return this.datasourceService.getGuests()[index];
    }
    
    remove(id: number) {
        const index = this.datasourceService
            .getGuests()
            .findIndex((guest) => guest.id === id);
        this.datasourceService.getGuests().splice(index, 1);

        return HttpStatus.OK;
    }
}
