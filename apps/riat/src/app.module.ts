import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  USERS_PACKAGE_NAME,
  USERS_SERVICE_NAME,
} from '@app/common/types/proto/users';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { SessionsModule } from './sessions/sessions.module';
import {
  SESSIONS_PACKAGE_NAME,
  SESSIONS_SERVICE_NAME,
} from '@app/common/types/proto/sessions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.development.env' : '.env',
    }),
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
              protoPath: join(__dirname, './proto/users.proto'),
            },
          }),
        },
      ],
    }),
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: SESSIONS_SERVICE_NAME,
          useFactory: () => ({
            transport: Transport.GRPC,
            options: {
              url: `${process.env.SESSIONS_SERVICE_HOST}:50051`,
              package: SESSIONS_PACKAGE_NAME,
              protoPath: join(__dirname, './proto/sessions.proto'),
            },
          }),
        },
      ],
    }),
    UsersModule,
    SessionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
