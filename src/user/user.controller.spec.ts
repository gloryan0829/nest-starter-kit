import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { UserController } from './user.controller';
import assert from 'assert';

describe('UserController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();
  });

  describe('UserController 컨트롤러 테스트', () => {
    it('saveUser 메서드 테스트', () => {
      const userCont = app.get<UserController>(UserController);
      // const user = userCont.saveUser({userId:123, userName:123});
      // expect(typeof user).toBe('object');
    });
  });


})