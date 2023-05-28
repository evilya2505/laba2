import { Injectable } from '@nestjs/common';
import { Guest } from 'src/guests/guest.entity';

@Injectable()
export class GuestsDatasourceService {
  private guests: Guest[] = [
    {   
      id: 1,
      firstname: "Макар",
      lastname: "Соловьев ",
      phonenumber: "571177516610",
      emailaddress: "hedwig@live.com",
      bookings: []
    },
    {   
      id: 2,
      firstname: "Дмитрий",
      lastname: "Терентьев",
      phonenumber: "21654282729",
      emailaddress: "pavel@gmail.com",
      bookings: []
    },
    {   
      id: 3,
      firstname: "Дмитрий",
      lastname: "Глебов",
      phonenumber: "858774460536",
      emailaddress: "campbell@outlook.com",
      bookings: []
    },
    {   
      id: 4,
      firstname: "Михаил",
      lastname: "Воробьев",
      phonenumber: "4295510362192",
      emailaddress: "haddawy@live.com",
      bookings: []
    },
    {   
      id: 5,
      firstname: "Анастасия",
      lastname: "Егорова",
      phonenumber: "7865540245",
      emailaddress: "jorgb@att.net",
      bookings: []
    }
  ];

  getGuests(): Guest[] {
    return this.guests;
  }
}