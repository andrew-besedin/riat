import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Sessions from './sessions.entity';

@Entity('films')
export default class Films {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Column()
  price: number;

  @Column()
  vip_price: number;

  @Column()
  showing_expired: boolean;

  @OneToMany(() => Sessions, (session) => session.film)
  sessions: Sessions[];
}
