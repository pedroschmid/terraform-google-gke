import { Module } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';

import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
})
export class UserModule {}
