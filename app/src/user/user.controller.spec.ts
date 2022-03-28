import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';

import { randomUUID } from 'crypto';

import { UserRepository } from 'src/user/user.repository';
import { UserController } from './user.controller';
import { UserService } from 'src/user/user.service';

import { PrismaService } from 'src/prisma/prisma.service';

import { IParams } from 'src/user/interfaces/params.interface';
import { ICustomResponse } from './interfaces/custom-response.interface';

const { OK, CREATED } = HttpStatus;

const mockedUser: User = {
  id: randomUUID(),
  email: 'test@test.com',
  password: 'test',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository, PrismaService],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('Initialization', () => {
    it('UserController should be defined', () => {
      expect(userController).toBeDefined();
    });

    it('UserService should be defined', () => {
      expect(userService).toBeDefined();
    });
  });

  describe('List', () => {
    it('Should return a CustomResponse containing a list of users', async () => {
      const params: IParams = {};

      const response: ICustomResponse = {
        status: OK,
        message: 'Listing users!',
        data: [mockedUser],
      };

      const listSpy = jest
        .spyOn(userController, 'list')
        .mockResolvedValue(response);

      const data = await userController.list(params);

      expect(listSpy).toBeCalledWith(params);
      expect(data).toBe(response);
      expect(data.status).toBe(response.status);
      expect(data.message).toBe(response.message);
      expect(data.data).toBe(response.data);
    });
  });

  describe('Show', () => {
    it('Should return a CustomResponse containing an users', async () => {
      const id: string = mockedUser.id;

      const response: ICustomResponse = {
        status: OK,
        message: 'Showing user!',
        data: mockedUser,
      };

      const showSpy = jest
        .spyOn(userController, 'show')
        .mockResolvedValue(response);

      const data = await userController.show(id);

      expect(showSpy).toBeCalledWith(id);
      expect(data).toBe(response);
      expect(data.status).toBe(response.status);
      expect(data.message).toBe(response.message);
      expect(data.data).toBe(response.data);
    });
  });

  describe('Store', () => {
    it('Should return a CustomResponse creating an user', async () => {
      const response: ICustomResponse = {
        status: CREATED,
        message: 'Creating user!',
        data: mockedUser,
      };

      const storeSpy = jest
        .spyOn(userController, 'store')
        .mockResolvedValue(response);

      const data = await userController.store(mockedUser);

      expect(storeSpy).toBeCalledWith(mockedUser);
      expect(data).toBe(response);
      expect(data.status).toBe(response.status);
      expect(data.message).toBe(response.message);
      expect(data.data).toBe(response.data);
    });
  });

  describe('Update', () => {
    it('Should return a CustomResponse updating an user', async () => {
      const response: ICustomResponse = {
        status: OK,
        message: 'Updating user!',
        data: mockedUser,
      };

      const updateSpy = jest
        .spyOn(userController, 'update')
        .mockResolvedValue(response);

      const data = await userController.update(mockedUser);

      expect(updateSpy).toBeCalledWith(mockedUser);
      expect(data).toBe(response);
      expect(data.status).toBe(response.status);
      expect(data.message).toBe(response.message);
      expect(data.data).toBe(response.data);
    });
  });

  describe('Destroy', () => {
    it('Should return a CustomResponse containing a list of users', async () => {
      const id: string = mockedUser.id;

      const response: ICustomResponse = {
        status: OK,
        message: 'Deleting user!',
        data: mockedUser,
      };

      const destroySpy = jest
        .spyOn(userController, 'destroy')
        .mockResolvedValue(response);

      const data = await userController.destroy(id);

      expect(destroySpy).toBeCalledWith(id);
      expect(data).toBe(response);
      expect(data.status).toBe(response.status);
      expect(data.message).toBe(response.message);
      expect(data.data).toBe(response.data);
    });
  });
});
