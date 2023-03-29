import { HttpStatus, Injectable } from "@nestjs/common";
import { FacilitiesDatasourceService } from "src/datasource/facilitiesdatasource.service";
import { Facility } from "./facility.entity";

@Injectable()
export class FacilitiesService {
    constructor(private readonly datasourceService: FacilitiesDatasourceService) {}

    create(facility: Facility) {
        this.datasourceService.getFacilities().push(facility);

        return facility;
    }

    findOne(id: number) {
        return this.datasourceService
          .getFacilities()
          .find((facility) => facility.id === id);
      } 

    findAll(): Facility[] {
        return this.datasourceService.getFacilities();
    }   
    
    update(id: number, updatedFacility: Facility) {
        const index = this.datasourceService
            .getFacilities()
            .findIndex((facility) => facility.id === id);
        this.datasourceService.getFacilities()[index] = updatedFacility;

        return this.datasourceService.getFacilities()[index];
    }
    
    remove(id: number) {
        const index = this.datasourceService
            .getFacilities()
            .findIndex((facility) => facility.id === id);
        this.datasourceService.getFacilities().splice(index, 1);

        return HttpStatus.OK;
    }
}
