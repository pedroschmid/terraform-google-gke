import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Prisma, User } from '@prisma/client';

import { UserService } from 'src/user/user.service';

import { IParams } from 'src/user/interfaces/params.interface';
import { ICustomResponse } from 'src/user/interfaces/custom-response.interface';
import { IUserController } from './interfaces/user-controller.interface';

const { OK, CREATED } = HttpStatus;

@Controller('/users')
export class UserController implements IUserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async list(params: IParams): Promise<ICustomResponse> {
    const data: User[] = await this.userService.list(params);
    return this.customResponse(OK, 'Listing users!', data);
  }

  @Get(':id')
  public async show(@Param('id') id: string): Promise<ICustomResponse> {
    const data: User = await this.userService.show(id);
    return this.customResponse(OK, 'Showing user!', data);
  }

  @Post()
  public async store(
    @Body() payload: Prisma.UserCreateInput,
  ): Promise<ICustomResponse> {
    const data: User = await this.userService.store(payload);
    return this.customResponse(CREATED, 'Creating user!', data);
  }

  @Put(':id')
  public async update(
    @Body() payload: Prisma.UserUpdateInput,
  ): Promise<ICustomResponse> {
    const data: User = await this.userService.update(payload);
    return this.customResponse(OK, 'Updating user!', data);
  }

  @Delete(':id')
  public async destroy(@Param('id') id: string): Promise<ICustomResponse> {
    const data: User = await this.userService.destroy(id);
    return this.customResponse(OK, 'Deleting user!', data);
  }

  private customResponse(
    status: HttpStatus,
    message: string,
    data: any,
  ): ICustomResponse {
    const customResponse: ICustomResponse = { status, message, data };
    return customResponse;
  }
}
