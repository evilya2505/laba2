import { User } from 'src/users/users.entity';

export class IncompleteBookingDto {
  bookingnumber: number;
  datefrom: Date;
  dateto: Date;
  user: User;
}
