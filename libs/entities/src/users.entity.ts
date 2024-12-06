import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Bookings from './bookings.entity';

@Entity('users')
export default class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Bookings, (booking) => booking.account)
  bookings: Bookings[];
}
