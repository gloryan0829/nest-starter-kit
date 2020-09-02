import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm/index';
import { User } from './User';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>): Promise<any> | void {
    console.log('User 테이블에 입력 전 : ', event.entity);
  }

  afterInsert(event: InsertEvent<User>): Promise<any> | void {
    console.log('User 테이블에 입력 후 : ', event.entity);
  }

} 