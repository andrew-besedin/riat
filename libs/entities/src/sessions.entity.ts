import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Halls from './halls.entity';
import Films from './films.entity';
import Bookings from './bookings.entity';

@Entity('sessions')
export default class Sessions {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Halls, (hall) => hall.sessions)
  hall: Halls;

  @ManyToOne(() => Films, (film) => film.sessions)
  film: Films;

  @Column()
  start_time: Date;

  @Column('character varying', { array: true })
  booked_seats: string[];

  @OneToMany(() => Bookings, (booking) => booking.session)
  bookings: Bookings[];
}
