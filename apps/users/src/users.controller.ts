import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserRequest,
  CreateUserResponse,
  UsersServiceClient,
  UsersServiceControllerMethods,
} from '@app/common/types/proto/users';
import { Observable } from 'rxjs';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceClient {
  constructor(private readonly usersService: UsersService) {}

  createUser(request: CreateUserRequest): Observable<CreateUserResponse> {
    return this.usersService.createUser(request);
  }
}
