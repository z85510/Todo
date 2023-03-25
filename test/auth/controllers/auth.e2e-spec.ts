import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/core/app.module';
import { User } from '../../../src/shared/entities/user';
import { Profile } from '../../../src/user/entities/profile';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let user: User;

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('/v1/api');
    await app.init();
  });

  describe('Creating new user > auth/register', () => {
    const URL = '/v1/api/auth/register';
    it('should create a new user and return tokens', () => {
      return request(app.getHttpServer())
        .post(URL)
        .send({ username: 'TestUser' + new Date(), password: '123456' })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('refresh_token');
          expect(res.body).not.toHaveProperty('password');
        });
    });

    it('should return a 400 when username is already exist', () => {
      return request(app.getHttpServer())
        .post(URL)
        .send({ username: 'TestUser', password: '123456' })
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({
            message: 'Username already exists',
            statusCode: 400,
          });
        });
    });
  });

  describe('Login user > auth/login', () => {
    const URL = '/v1/api/auth/login';
    it('should return token', () => {
      return request(app.getHttpServer())
        .post(URL)
        .send({ username: 'TestUser', password: '123456' })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('username');
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('refresh_token');
          expect(res.body).not.toHaveProperty('password');
          user = res.body;
        });
    });
  });

  describe('Refresh Token > auth/refresh', () => {
    const URL = '/v1/api/auth/refresh';
    it('should return token', async () => {
      const mockUser = {
        id: user.id,
        username: user.username,
        refreshToken: user.refreshToken,
      };

      const req = request(app.getHttpServer()).post(URL).send(mockUser);
      req.expect(201).expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            access_token: expect.any(String),
            refresh_token: expect.any(String),
          }),
        );
      });
    });

    it('should return 503 if token doesnt exist', () => {
      return request(app.getHttpServer()).post(URL).send({}).expect(503);
    });
  });
});
