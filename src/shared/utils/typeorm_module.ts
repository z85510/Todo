import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeORMConfig = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || 'nest',
    password: process.env.DB_PASSWORD || 'nest',
    database: process.env.DB_NAME || 'test',
    entities: [...entities],
    synchronize: true,
  });
