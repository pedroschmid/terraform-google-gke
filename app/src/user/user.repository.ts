import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';

import { IParams } from 'src/user/interfaces/params.interface';
import { IUserRepository } from './interfaces/user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(params: IParams): Promise<User[]> {
    return await this.prismaService.user.findMany(params);
  }

  public async findOne(id: string): Promise<User> {
    const exists: boolean = await this.alreadyExists(id);

    if (!exists) {
      throw new NotFoundException('User not found!');
    }

    return await this.prismaService.user.findUnique({
      where: { id },
      rejectOnNotFound: true,
    });
  }

  public async create(data: Prisma.UserCreateInput): Promise<User> {
    const exists: boolean = await this.alreadyExists(data.email as string);

    if (exists) {
      throw new ConflictException('User with this email already exists!');
    }

    return await this.prismaService.user.create({ data });
  }

  public async update(data: Prisma.UserUpdateInput): Promise<User> {
    const id: string = data.id as string;
    const exists: boolean = await this.alreadyExists(data.email as string);

    if (!exists) {
      throw new NotFoundException('Could not update user, entity not found!');
    }

    return await this.prismaService.user.update({ where: { id }, data });
  }

  public async delete(id: string): Promise<User> {
    const exists: boolean = await this.alreadyExists(id);

    console.log(exists);

    if (!exists) {
      throw new NotFoundException('Could not delete user, entity not found!');
    }

    return await this.prismaService.user.delete({ where: { id } });
  }

  private async alreadyExists(id?: string, email?: string): Promise<boolean> {
    const data: User = await this.prismaService.user.findFirst({
      where: {
        OR: [{ id }, { email }],
      },
    });

    return data ? true : false;
  }
}
