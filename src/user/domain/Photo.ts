import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm/index';
import { User } from './User';

@Entity()
export class Photo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(type => User, user => user.photos, {
    cascade : true
  })
  @JoinColumn({ name: 'ref_userId' })
  user: User;

}