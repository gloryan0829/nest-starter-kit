import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { UserController } from './user.controller';
import assert from 'assert';
import { UserService } from './user.service';
import { User } from './domain/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './domain/Photo';
import { TestService } from '../test/test.service';
import { getTypeOrmModule } from '../common/typeorm/typeorm.config';

describe('UserController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [getTypeOrmModule(), TypeOrmModule.forFeature([User, Photo])],
      controllers: [UserController],
      providers: [UserService, TestService],
    }).compile();
  });

  describe('UserController 컨트롤러 테스트', () => {
    it('saveUser 메서드 테스트', () => {
      const userCont = app.get<UserController>(UserController);
      // const user = userCont.saveUser({userId:123, userName:123});
      // expect(typeof user).toBe('object');
    });
  });

  describe('UserService 테스트', () => {
    it('createUsers 트랜잭션 처리 테스트 - 성공', async () => {
      const userService = app.get<UserService>(UserService);
      const isSuccess = await userService.createUsers([
        new User('a1', 'a1', '1234', 10, true, []),
        new User('b1', 'b1', '1234', 10, true, [])
      ]);
      console.log(isSuccess);
      expect(isSuccess).toBeTruthy();
    });

    it('createUsers 트랜잭션 처리 테스트 - 실패', async () => {
      const userService = app.get<UserService>(UserService);
      const isSuccess = await userService.createUsers([
        new User('c1', 'a1', '1234', 10, true, []),
        new User(null, 'b1', '1234', 10, true, [])
      ]);
      console.log(isSuccess);
      expect(isSuccess).toBeFalsy();
    });
// 1
    it('User 모델 테스트 ', () => {

    });
    //

    it('', () => {
      User user = new User();
    });


  });
});