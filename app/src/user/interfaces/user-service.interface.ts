import { Prisma, User } from '@prisma/client';

import { IParams } from 'src/user/interfaces/params.interface';

export interface IUserService {
  list(params: IParams): Promise<User[]>;
  show(id: string): Promise<User | null>;
  store(data: Prisma.UserCreateInput): Promise<User>;
  update(data: Prisma.UserUpdateInput): Promise<User>;
  destroy(id: string): Promise<User>;
}
