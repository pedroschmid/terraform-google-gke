import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';

import { randomUUID } from 'crypto';

import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';

import { PrismaService } from 'src/prisma/prisma.service';

import { IParams } from 'src/user/interfaces/params.interface';

const mockedUser: User = {
  id: randomUUID(),
  email: 'test@test.com',
  password: 'test',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('UserService', () => {
  let userRepository: UserRepository;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService, UserRepository],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    userService = module.get<UserService>(UserService);
  });

  describe('Initialization', () => {
    it('UserService should be defined', () => {
      expect(userService).toBeDefined();
    });
  });

  describe('List', () => {
    it('Should return an array of users', async () => {
      const arrayOfUsers = [mockedUser];
      const params = {} as IParams;

      jest.spyOn(userService, 'list').mockResolvedValue(arrayOfUsers);

      const data: User[] = await userService.list(params);

      expect(data).toBe(arrayOfUsers);
    });

    it('Should verify if method its being called with params', async () => {
      const listSpy = jest.spyOn(userService, 'list');
      const params = {} as IParams;

      await userService.list(params);

      expect(listSpy).toHaveBeenCalledWith(params);
    });
  });

  describe('Show', () => {
    it('Should return an specified user by id', async () => {
      const id: string = mockedUser.id;

      jest.spyOn(userService, 'show').mockResolvedValue(mockedUser);

      const data: User = await userService.show(id);

      expect(data).toBe(mockedUser);
    });

    it('Should verify Should verify if method its being called with id as parameter', async () => {
      const showSpy = jest
        .spyOn(userService, 'show')
        .mockResolvedValue(mockedUser);
      const id: string = mockedUser.id;

      await userService.show(id);

      expect(showSpy).toHaveBeenCalledWith(id);
    });
  });

  describe('Store', () => {
    it('Should create and return an user', async () => {
      jest.spyOn(userService, 'store').mockResolvedValue(mockedUser);

      const data = await userService.store(mockedUser);

      expect(data).toBe(mockedUser);
    });

    it('Should thrown an conflict exception if email already exists', async () => {
      const alreadyExistsSpy = jest
        .spyOn(userRepository as any, 'alreadyExists')
        .mockResolvedValue(true);

      jest.spyOn(userService, 'store');

      const data = userService.store(mockedUser);

      expect(alreadyExistsSpy).toBeCalled();
      await expect(data).rejects.toEqual(
        new ConflictException('User with this email already exists!'),
      );
    });
  });

  describe('Update', () => {
    it('Should update an user', async () => {
      const updateSpy = jest
        .spyOn(userService, 'update')
        .mockResolvedValue(mockedUser);

      const data = await userService.update(mockedUser);

      expect(updateSpy).toBeCalledWith(mockedUser);
      expect(data).toBe(mockedUser);
    });

    it('Should thrown an error if user does not exists', async () => {
      const updateSpy = jest.spyOn(userService, 'update');

      const update = userService.update(mockedUser);

      expect(updateSpy).toBeCalled();
      await expect(update).rejects.toEqual(
        new NotFoundException('Could not update user, entity not found!'),
      );
    });
  });

  describe('Destroy', () => {
    it('Should delete an user', async () => {
      const id: string = mockedUser.id;
      const destroySpy = jest
        .spyOn(userService, 'destroy')
        .mockResolvedValue(mockedUser);

      const data = await userService.destroy(id);

      expect(destroySpy).toBeCalledWith(id);
      expect(data).toBe(mockedUser);
    });

    it('Should thrown an error if user does not exists', async () => {
      const id: string = randomUUID();
      const destroySpy = jest.spyOn(userService, 'destroy');

      const destroy = userService.destroy(id);

      expect(destroySpy).toBeCalled();
      await expect(destroy).rejects.toEqual(
        new NotFoundException('Could not delete user, entity not found!'),
      );
    });
  });
});
