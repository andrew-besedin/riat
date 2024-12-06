import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Users from './users.entity';
import Sessions from './sessions.entity';

@Entity('bookings')
export default class Bookings {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Users, (user) => user.bookings)
  account: Users;

  @ManyToOne(() => Sessions, (session) => session.bookings)
  session: Sessions;

  @Column()
  seat: string;
}
