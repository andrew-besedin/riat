import {
  CreateUserRequest,
  USERS_SERVICE_NAME,
  UsersServiceClient,
} from '@app/common/types/proto/users';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UsersService implements OnModuleInit {
  private subscriptionsService: UsersServiceClient;
  constructor(@Inject(USERS_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.subscriptionsService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  createUser(request: CreateUserRequest) {
    return this.subscriptionsService.createUser(request);
  }
}
