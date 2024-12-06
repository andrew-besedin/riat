import { Body, Controller, Logger, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() body: any) {
    Logger.log('/users/create call with body: ', body);
    return this.usersService.createUser(body);
  }
}
