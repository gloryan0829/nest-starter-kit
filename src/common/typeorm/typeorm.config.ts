import { TypeOrmModule } from '@nestjs/typeorm';

export const getTypeOrmModule = () => {
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'uaa',
    autoLoadEntities: true,
    // entities: [User, Photo],
    synchronize: true,
  })
};