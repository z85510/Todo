import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../src/shared/entities/user';
import * as bcryptUtils from '../../../src/shared/utils/bcrypt';
import { CreateUserParams } from '../../../src/shared/utils/types';
import { Profile } from '../../../src/user/entities/profile';
import { UsersService } from '../../../src/user/services/users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Repository<User>;
  let profileRepository: Repository<Profile>;
  let createUserParams: CreateUserParams;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);
  const PROFILE_REPOSITORY_TOKEN = getRepositoryToken(Profile);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        {
          provide: PROFILE_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
    profileRepository = module.get<Repository<Profile>>(
      PROFILE_REPOSITORY_TOKEN,
    );

    createUserParams = {
      username: 'john_doe',
      password: '123',
    };
  });

  it('UsersService should be defiend', () => {
    expect(usersService).toBeDefined();
  });

  it('UserRepository should be defiend', () => {
    expect(userRepository).toBeDefined();
  });

  it('ProfileRepository should be defiend', () => {
    expect(profileRepository).toBeDefined();
  });

  describe('CreateUser', () => {
    it('should encode password correctly', async () => {
      jest
        .spyOn(bcryptUtils, 'encodePassword')
        .mockReturnValue('hashed' + createUserParams.password);
      await usersService.createUser(createUserParams);
      expect(bcryptUtils.encodePassword).toHaveBeenCalledWith(
        createUserParams.password,
      );
    });

    it('should call userRepository.create with correct params', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      await usersService.createUser(createUserParams);
      expect(userRepository.create).toHaveBeenCalledWith({
        ...createUserParams,
        password: 'hashed' + createUserParams.password,
        createdAt: createdAt,
        updatedAt: updatedAt,
      });
      expect(userRepository.create);
    });

    it('should call userRepository.save for update user', async () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      jest.spyOn(userRepository, 'create').mockReturnValueOnce({
        id: 1,
        ...createUserParams,
        password: 'hashed' + createUserParams.password,
        refreshToken: '',
        createdAt: createdAt,
        updatedAt: updatedAt,
        profile: new Profile(),
        todos: [],
      });

      await usersService.createUser(createUserParams);
      expect(userRepository.save).toHaveBeenCalledWith({
        id: 1,
        ...createUserParams,
        password: 'hashed' + createUserParams.password,
        refreshToken: '',
        createdAt: createdAt,
        updatedAt: updatedAt,
        profile: new Profile(),
        todos: [],
      });
    });
  });
});
