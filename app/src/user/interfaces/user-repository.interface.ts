import { Prisma, User } from '@prisma/client';

import { IParams } from 'src/user/interfaces/params.interface';

export interface IUserRepository {
  findAll(params: IParams): Promise<User[]>;
  findOne(id: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(data: Prisma.UserUpdateInput): Promise<User>;
  delete(id: string): Promise<User>;
}
