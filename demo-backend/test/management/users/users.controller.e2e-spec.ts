import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UsersController } from '../../../src/management/users/users.controller';
import { UsersService } from '../../../src/shared/services/users.service';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let mockUsersService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      // imports: [AppModule],
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/users (GET)', async () => {
    const expected = { mocked: 'value' };
    mockUsersService.findAll = jest.fn().mockReturnValue(expected);
    await request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(expected);
    expect(mockUsersService.findAll).toHaveBeenCalled();
    expect(mockUsersService.findAll).toHaveBeenCalledTimes(1);
  });

  describe('/users (POST)', () => {
    let user;
    beforeEach(() => {
      mockUsersService.create = jest.fn();
      user = {
        name: 'new user name',
        description: 'to verify users API',
        password: 'Pa$$w0rd',
      };
    });

    it('happy scenario', async () => {
      await request(app.getHttpServer()).post('/users').send(user).expect(201);
      expect(mockUsersService.create).toHaveBeenCalled();
      expect(mockUsersService.create).toHaveBeenCalledTimes(1);
    });

    describe('negative scenarios', () => {
      describe('name is', () => {
        it('null', async () => {
          user.name = null;
          await request(app.getHttpServer())
            .post('/users')
            .send(user)
            .expect(400);
          expect(mockUsersService.create).not.toHaveBeenCalled();
        });

        it('empty', async () => {
          user.name = '';
          await request(app.getHttpServer())
            .post('/users')
            .send(user)
            .expect(400);
          expect(mockUsersService.create).not.toHaveBeenCalled();
        });

        it('absent', async () => {
          delete user.name;
          await request(app.getHttpServer())
            .post('/users')
            .send(user)
            .expect(400);
          expect(mockUsersService.create).not.toHaveBeenCalled();
        });

        it('contains neither letters nor digits', async () => {
          user.name = '    ,%  #@  ';
          await request(app.getHttpServer())
            .post('/users')
            .send(user)
            .expect(400);
          expect(mockUsersService.create).not.toHaveBeenCalled();
        });
      });

      describe('description is', () => {
        it('number', async () => {
          user.description = 232;
          await request(app.getHttpServer())
            .post('/users')
            .send(user)
            .expect(400);
          expect(mockUsersService.create).not.toHaveBeenCalled();
        });
      });

      describe('password is', () => {
        it('less than 8 characters', async () => {
          user.password = user.password.slice(0, 7);
          await request(app.getHttpServer())
            .post('/users')
            .send(user)
            .expect(400);
          expect(mockUsersService.create).not.toHaveBeenCalled();
        });

        it('no uppercase symbols', async () => {
          user.password = user.password.toLowerCase();
          await request(app.getHttpServer())
            .post('/users')
            .send(user)
            .expect(400);
          expect(mockUsersService.create).not.toHaveBeenCalled();
        });

        it('no lowcase symbols', async () => {
          user.password = user.password.toUpperCase();
          await request(app.getHttpServer())
            .post('/users')
            .send(user)
            .expect(400);
          expect(mockUsersService.create).not.toHaveBeenCalled();
        });

        it('no digits', async () => {
          user.password = user.password.replaceAll(/\d/g, 'D');
          await request(app.getHttpServer())
            .post('/users')
            .send(user)
            .expect(400);
          expect(mockUsersService.create).not.toHaveBeenCalled();
        });

        it('no special characters', async () => {
          user.password = user.password.replaceAll(/[#?!@$%^&*-]/g, 'S');
          await request(app.getHttpServer())
            .post('/users')
            .send(user)
            .expect(400);
          expect(mockUsersService.create).not.toHaveBeenCalled();
        });
      });
    });
  });
});
