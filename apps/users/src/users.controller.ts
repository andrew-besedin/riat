import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserRequest,
  CreateUserResponse,
  UsersServiceController,
  UsersServiceControllerMethods,
} from '@app/common/types/proto/users';
import { Observable } from 'rxjs';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  createUser(
    request: CreateUserRequest,
  ):
    | Promise<CreateUserResponse>
    | Observable<CreateUserResponse>
    | CreateUserResponse {
    return this.usersService.createUser(request);
  }
}
