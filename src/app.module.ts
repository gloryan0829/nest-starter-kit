import {
  HttpException,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';
import { LoggerMiddleware } from './middleware/LoggerMiddleware';
import * as cors from 'cors';
import { ExceptModule } from './exception/except.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/domain/User';
import { Photo } from './user/domain/Photo';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'uaa',
      autoLoadEntities: true,
      // entities: [User, Photo],
      synchronize: true,
    }),
    UserModule,
    TestModule,
    ExceptModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(cors(), LoggerMiddleware)
      .exclude({ path: 'user/list', method: RequestMethod.GET })
      .forRoutes('user');
  }
}
