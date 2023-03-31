import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../src/shared/entities/user';
import { Task } from '../../src/todo/entities/task';
import { Todo } from '../../src/todo/entities/todo';
import { UsersController } from '../../src/user/controllers/users.controller';
import { Profile } from '../../src/user/entities/profile';
import { UsersService } from '../../src/user/services/users.service';
describe('UsersService', () => {
  let service: UsersService;
  let app;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'x9n7z4a1Sa',
          database: 'snakes_pool',
          entities: [User, Profile, Todo, Task],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Profile, Todo, Task]),
      ],
      controllers: [UsersController],
      providers: [UsersService],
      exports: [UsersService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    jest.resetAllMocks();
    await app.close();
  });
});
