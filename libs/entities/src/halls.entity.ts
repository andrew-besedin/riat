import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Sessions from './sessions.entity';

@Entity('halls')
export default class Halls {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  number: number;

  @Column('text', { array: true })
  seats_config: string[];

  @OneToMany(() => Sessions, (session) => session.hall)
  sessions: Sessions[];
}
