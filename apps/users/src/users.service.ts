import { CreateUserRequest } from '@app/common/types/proto/users';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  createUser(request: CreateUserRequest) {
    return { success: !!request };
  }
}
