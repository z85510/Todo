import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/core/app.module';
import { before } from 'node:test';
import { createConnection } from 'mysql2';

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

  describe('Creating new user posts auth/register', () => {
    const CREATE_USER_URL = '/v1/api/auth/register';
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({ username: 'dsdssdsdsd', password: '123456' })
        .expect(201);
    });

    it('should return a 400 when username is already exist', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({ username: 'dsdssdsdsd', password: '123456' })
        .expect(400);
    });
  });
});
