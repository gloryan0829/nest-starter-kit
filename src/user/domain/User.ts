import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm/index';
import { Photo } from './Photo';

@Entity()
export class User {

  constructor(userId: string, userName: string, userPassword: string, age: number, isActive: boolean, photos: Photo[]) {
    this.userId = userId;
    this.userName = userName;
    this.userPassword = userPassword;
    this.age = age;
    this.isActive = isActive;
    this.photos = photos;
  }

  @PrimaryColumn()
  userId: string;

  @Column()
  userName: string;

  @Column()
  userPassword: string;

  @Column()
  age: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(type => Photo, photo => photo.user)
  photos: Photo[]

}