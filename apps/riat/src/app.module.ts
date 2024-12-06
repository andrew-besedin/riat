import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  USERS_PACKAGE_NAME,
  USERS_SERVICE_NAME,
} from '@app/common/types/proto/users';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: USERS_SERVICE_NAME,
          useFactory: () => ({
            transport: Transport.GRPC,
            options: {
              url: `${process.env.USERS_SERVICE_HOST}:50051`,
              package: USERS_PACKAGE_NAME,
              protoPath: join(__dirname, './proto/subscriptions.proto'),
            },
          }),
        },
      ],
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
