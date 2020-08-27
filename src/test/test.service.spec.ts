import { Test, TestingModule } from '@nestjs/testing';
import { TestService } from './test.service';

describe('TestModule Test', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [TestService],
    }).compile();
  });

  describe('App Tset...', () => {
    it('saveUser 메서드 테스트', () => {
      const testService = app.get<TestService>(TestService);
      console.log(testService);
    });
  });


})