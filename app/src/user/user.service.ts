import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { UserRepository } from 'src/user/user.repository';
import { IUserService } from 'src/user/interfaces/user-service.interface';
import { IParams } from 'src/user/interfaces/params.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async list(params: IParams): Promise<User[]> {
    return await this.userRepository.findAll(params);
  }

  public async show(id: string): Promise<User | null> {
    return await this.userRepository.findOne(id);
  }

  public async store(payload: Prisma.UserCreateInput): Promise<User> {
    return await this.userRepository.create(payload);
  }

  public async update(payload: Prisma.UserUpdateInput): Promise<User> {
    return await this.userRepository.update(payload);
  }

  public async destroy(id: string): Promise<User> {
    return await this.userRepository.delete(id);
  }
}
