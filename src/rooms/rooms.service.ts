import { HttpStatus, Injectable } from "@nestjs/common";
import { RoomsDatasourceService } from "src/datasource/roomsdatasource.service";
import { Room } from "./room.entity";

@Injectable()
export class RoomsService {
    constructor(private readonly datasourceService: RoomsDatasourceService) {}

    create(room: Room) {
        this.datasourceService.getRooms().push(room);

        return room;
    }

    findOne(id: number) {
        return this.datasourceService
          .getRooms()
          .find((room) => room.id === id);
      } 

    findAll(): Room[] {
        return this.datasourceService.getRooms();
    }   
    
    update(id: number, updatedRoom: Room) {
        const index = this.datasourceService
            .getRooms()
            .findIndex((room) => room.id === id);
        this.datasourceService.getRooms()[index] = updatedRoom;

        return this.datasourceService.getRooms()[index];
    }
    
    remove(id: number) {
        const index = this.datasourceService
            .getRooms()
            .findIndex((room) => room.id === id);
        this.datasourceService.getRooms().splice(index, 1);

        return HttpStatus.OK;
    }
}
