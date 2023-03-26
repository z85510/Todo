import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/core/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let refreshToken: string;
  const baseUrl = '/v1/api/';

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix(baseUrl);
    await app.init();

    const response = await request(app.getHttpServer())
      .post(`${baseUrl}auth/login`)
      .send({ username: 'RF', password: '123456789' });
    accessToken = response.body['access_token'];
    refreshToken = response.body['refresh_token'];
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Creating new user > auth/register', () => {
    const URL = 'auth/register';
    it('should create a new user and return tokens', () => {
      return request(app.getHttpServer())
        .post(`${baseUrl}${URL}`)
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
        .post(`${baseUrl}${URL}`)
        .send({ username: 'RF', password: '123456789' })
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({
            message: 'Username already exists',
            statusCode: 400,
          });
        });
    });

    it('should return a 400 when username or password is empty', () => {
      return request(app.getHttpServer()).post(`${baseUrl}${URL}`).expect(400);
    });
  });

  describe('Login user > auth/login', () => {
    const URL = 'auth/login';

    it('should return token', () => {
      return request(app.getHttpServer())
        .post(`${baseUrl}${URL}`)
        .send({ username: 'RF', password: '123456789' })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('username');
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('refresh_token');
          expect(res.body).not.toHaveProperty('password');
        });
    });

    it('should return a 400 when username or password is empty', () => {
      return request(app.getHttpServer()).post(`${baseUrl}${URL}`).expect(400);
    });
  });

  describe('Refresh Token > auth/refresh', () => {
    const URL = 'auth/refresh';

    it('should return token', async () => {
      return request(app.getHttpServer())
        .post(`${baseUrl}${URL}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ refreshToken: refreshToken })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('refresh_token');
        });
    });

    it('should return 503 if token is missing', () => {
      return request(app.getHttpServer())
        .post(`${baseUrl}${URL}`)
        .send({})
        .expect(503);
    });
  });

  describe('Logout > auth/logout', () => {
    const URL = 'auth/logout';
    it('should return token', async () => {
      return request(app.getHttpServer())
        .post(`${baseUrl}${URL}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(201);
    });

    it('should return 503 if token is missing', () => {
      return request(app.getHttpServer()).post(`${baseUrl}${URL}`).expect(503);
    });
  });
});
