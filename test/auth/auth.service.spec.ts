import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/services/auth.service';
import { UsersService } from '../../src/user/services/users.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/shared/entities/user';
import { Profile } from '../../src/user/entities/profile';
import * as bcryptUtils from '../../src/shared/utils/bcrypt';
import { log } from 'console';

describe('AuthService', () => {
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);
  const PROFILE_REPOSITORY_TOKEN = getRepositoryToken(Profile);

  describe('AuthService', () => {
    let authService: AuthService;
    let usersService: UsersService;
    let jwtService: JwtService;

    const mockUser = {
      id: 1,
      username: 'RF',
      password: '123456789',
      refreshToken: 'refreshToken',
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        mobileNumber: '',
        age: 30,
        email: 'johndoe@example.com',
        birthDate: new Date(),
        createdAt: new Date(),
      },
      todos: [],
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          UsersService,
          {
            provide: USER_REPOSITORY_TOKEN,
            useValue: {
              findByUsername: jest.fn(),
            },
          },
          {
            provide: PROFILE_REPOSITORY_TOKEN,
            useValue: {},
          },
          JwtService,
        ],
      }).compile();

      authService = module.get<AuthService>(AuthService);
      usersService = module.get<UsersService>(UsersService);
      jwtService = module.get<JwtService>(JwtService);
    });

    describe('validateUserCredentials', () => {
      it('should throw NotFoundException if user is not found', async () => {
        const username = 'testuser';
        jest.spyOn(usersService, 'findByUsername').mockResolvedValue(null);

        await expect(
          authService.validateUserCredentials(username, 'password'),
        ).rejects.toThrowError(NotFoundException);

        expect(usersService.findByUsername).toHaveBeenCalledWith(username);
      });

      it('should throw UnauthorizedException if password is incorrect', async () => {
        const username = 'RF';
        const password = '1234567890';

        jest.spyOn(usersService, 'findByUsername').mockResolvedValue(mockUser);
        jest.spyOn(bcryptUtils, 'comparePassword').mockReturnValue(false);

        await expect(
          authService.validateUserCredentials(username, password),
        ).rejects.toThrowError(UnauthorizedException);

        expect(usersService.findByUsername).toHaveBeenCalledWith(username);

        expect(bcryptUtils.comparePassword).toHaveBeenCalledWith(
          password,
          mockUser.password,
        );
      });

      it('should return user if username and password are correct', async () => {
        const username = 'testuser';
        const password = 'password';

        jest.spyOn(usersService, 'findByUsername').mockResolvedValue(mockUser);
        jest.spyOn(bcryptUtils, 'comparePassword').mockReturnValue(true);

        const result = await authService.validateUserCredentials(
          username,
          password,
        );
        expect(usersService.findByUsername).toHaveBeenCalledWith(username);
        expect(bcryptUtils.comparePassword).toHaveBeenCalledWith(
          password,
          mockUser.password,
        );
        expect(result).toEqual(mockUser);
      });
    });
  });
});
