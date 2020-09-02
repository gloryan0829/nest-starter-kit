import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './domain/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './domain/Photo';
import { TestService } from '../test/test.service';
import { getTypeOrmModule } from '../common/typeorm/typeorm.config';
import * as request from 'supertest';

describe('UserController', () => {
  let app: TestingModule;
  let testServer;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [getTypeOrmModule(), TypeOrmModule.forFeature([User, Photo])],
      controllers: [UserController],
      providers: [UserService, TestService],
    }).compile();

    testServer = app.createNestApplication();
    await testServer.init();
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
        new User('b1', 'b1', '1234', 10, true, []),
      ]);
      console.log(isSuccess);
      expect(isSuccess).toBeTruthy();
    });

    it('createUsers 트랜잭션 처리 테스트 - 실패', async () => {
      const userService = app.get<UserService>(UserService);
      const isSuccess = await userService.createUsers([
        new User('c1', 'a1', '1234', 10, true, []),
        new User(null, 'b1', '1234', 10, true, []),
      ]);
      console.log(isSuccess);
      expect(isSuccess).toBeFalsy();
    });

    it('db insert 처리시 Subscriber 이벤트 작동 여부 확인', () => {
      const userData = {
        userId: 'test',
        userName: 'test',
        userPassword: '1234',
        age: 13,
        isActive: true,
        photos: [],
      };

      request(testServer.getHttpServer())
        .post('/user')
        .send(userData)
        .expect(200)
        .then((res) => expect(res.body.statusCode).toBe(201));
    });
  });
});
