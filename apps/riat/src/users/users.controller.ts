import { Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor() {}

  @Post('create')
  create() {
    return 'create';
  }
}
