import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/core/app.module';
import { User } from '../../../src/shared/entities/user';
import { Profile } from '../../../src/user/entities/profile';

describe('UserController (e2e)', () => {
  let app: INestApplication;

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

  describe('Profile > /profile', () => {
    const URL = '/v1/api/profile';
    it('should return user', async () => {
      let accessToken: string;

      await request(app.getHttpServer())
        .post('/v1/api/auth/login')
        .send({ username: 'TestUser', password: '123456' })
        .expect((res) => {
          accessToken = res.body['access_token'];
        });

      return request(app.getHttpServer())
        .get(URL)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });

    it('should return 503 if token doesnt exist', () => {
      return request(app.getHttpServer()).get(URL).expect(503);
    });
  });
});
