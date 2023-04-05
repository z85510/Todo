import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/core/app.module';
import { CreateUserProfileParams } from '../../src/shared/utils/types';
import { UpdateUserDto } from '../../src/user/dtos/update_user.dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  const baseUrl = '/v1/api/';

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix(baseUrl);
    await app.init();
    const URL = 'auth/login';
    const response = await request(app.getHttpServer())
      .post(`${baseUrl}${URL}`)
      .send({ username: 'RF', password: '123456789' });

    accessToken = response.body['access_token'];
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Get all user > /user/all', () => {
    const URL = 'user/all';
    it('should return all user', async () => {
      return request(app.getHttpServer())
        .get(`${baseUrl}${URL}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('should return 503 if token is missing', () => {
      return request(app.getHttpServer()).get(`${baseUrl}${URL}`).expect(503);
    });
  });

  describe('Get a user > user/:id', () => {
    it('should return a user without id', async () => {
      return request(app.getHttpServer())
        .get(`${baseUrl}user`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });

    it('should return a user when given a valid ID', async () => {
      const res = await request(app.getHttpServer())
        .get(`${baseUrl}user`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      const userId = res.body['id'];

      return request(app.getHttpServer())
        .get(`${baseUrl}user/${userId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject({
            id: userId,
            username: expect.any(String),
            refreshToken: expect.any(String),
          });
        });
    });

    it('should return a 404 error when given an invalid ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`${baseUrl}user/999999`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(404);

      expect(response.body).toMatchObject({
        statusCode: 404,
      });
    });

    it('should return 503 if token is missing', () => {
      return request(app.getHttpServer()).get(`${baseUrl}user`).expect(503);
    });
  });

  describe('Update User / Patch', () => {
    const URL = 'user/update';

    const userDetails: UpdateUserDto = {
      username: 'RF',
      password: '123456789',
    };

    it('should return user', async () => {
      return request(app.getHttpServer())
        .patch(`${baseUrl}${URL}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(userDetails)
        .expect(200);
    });

    it('should return 503 if token is missing', () => {
      return request(app.getHttpServer())
        .patch(`${baseUrl}${URL}`)
        .send(userDetails)
        .expect(503);
    });
  });

  describe('Post profile / POST', () => {
    const URL = 'profile';
    it('should return user', async () => {
      const profileData: CreateUserProfileParams = {
        firstName: 'Aref',
        lastName: 'Rafei',
        email: 'RF92@gmail.com',
        birthDate: new Date(),
      };

      return request(app.getHttpServer())
        .post(`${baseUrl}${URL}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(profileData)
        .expect(201);
    });

    it('should return 503 if token is missing', () => {
      return request(app.getHttpServer()).post(`${baseUrl}${URL}`).expect(503);
    });

    it('should return 400 if params is missing', () => {
      return request(app.getHttpServer())
        .post(`${baseUrl}${URL}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(400);
    });
  });

  describe('Get profile / GET', () => {
    const URL = 'profile';
    it('should return user', async () => {
      return request(app.getHttpServer())
        .get(`${baseUrl}${URL}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });

    it('should return 503 if token is missing', () => {
      return request(app.getHttpServer()).get(`${baseUrl}${URL}`).expect(503);
    });
  });

  describe('Delete User / Delete', () => {
    const URL = 'user/delete';

    it('should return 503 if token is missing', () => {
      return request(app.getHttpServer())
        .delete(`${baseUrl}${URL}`)
        .expect(503);
    });

    it('should delete user', async () => {
      return request(app.getHttpServer())
        .delete(`${baseUrl}${URL}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });
  });
});
