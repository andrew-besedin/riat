import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Halls from './halls.entity';
import Films from './films.entity';

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

  @Column('text', { array: true })
  booked_seats: string[];
}
