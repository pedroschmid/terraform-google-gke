import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public async onModuleInit() {
    await this.$connect();

    this.$use(async (params: Prisma.MiddlewareParams, next) => {
      // Before create user, encrypt password
      if (params.action == 'create' && params.model == 'User') {
        const user = params.args.data;

        user.password = await this.encryptPassword(user.password);
        params.args.data = user;
      }

      return await next(params);
    });
  }

  public async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  private async encryptPassword(password: string): Promise<string> {
    const salt = 10;
    const encryptedPassword = await bcrypt.hash(password, salt);

    return encryptedPassword;
  }
}
