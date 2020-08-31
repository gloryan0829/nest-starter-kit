import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './domain/User';
import { Connection, Repository } from 'typeorm/index';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private connection: Connection
  ) {
    this.connection = connection;
    this.userRepository = userRepository;
  }

  /**
   * User 리스트 조회
   */
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * 특정 유저 조회
   * @param id
   */
  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({ userId: id });
  }

  /**
   * 유저 저장
   * @param user
   */
  async saveUser(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  /**
   * 유저 삭제
   */
  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete({ userId: id });
  }

  /**
   * 다수의 유저 입력
   */
  async createUsers(users: User[]) {
    let isSuccess = true;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(users[0]);
      await queryRunner.manager.save(users[1]);

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log('Rollback 실행..')
      await queryRunner.rollbackTransaction();
      isSuccess = false;
    } finally {
      await queryRunner.release();
      return isSuccess;
    }
  }
}
