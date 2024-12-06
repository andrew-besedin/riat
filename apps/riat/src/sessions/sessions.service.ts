import {
  SESSIONS_SERVICE_NAME,
  SessionsServiceClient,
} from '@app/common/types/proto/sessions';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class SessionsService implements OnModuleInit {
  private usersService: SessionsServiceClient;
  constructor(@Inject(SESSIONS_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService = this.client.getService<SessionsServiceClient>(
      SESSIONS_SERVICE_NAME,
    );
  }
  getAll() {
    Logger.log('getAll gRPC call');
    return this.usersService.getSessionsList({});
  }
}
