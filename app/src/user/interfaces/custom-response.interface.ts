import { HttpStatus } from '@nestjs/common';

export interface ICustomResponse {
  status: HttpStatus;
  message: string;
  data: any;
}
