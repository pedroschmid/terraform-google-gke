import { Prisma } from '@prisma/client';

import { IParams } from 'src/user/interfaces/params.interface';
import { ICustomResponse } from 'src/user/interfaces/custom-response.interface';

export interface IUserController {
  list(params: IParams): Promise<ICustomResponse>;
  show(id: string): Promise<ICustomResponse>;
  store(data: Prisma.UserCreateInput): Promise<ICustomResponse>;
  update(data: Prisma.UserUpdateInput): Promise<ICustomResponse>;
  destroy(id: string): Promise<ICustomResponse>;
}
