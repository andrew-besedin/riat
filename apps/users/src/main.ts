import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USERS_PACKAGE_NAME } from '@app/common/types/proto/users';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50051',
        protoPath: join(__dirname, './proto/users.proto'),
        package: USERS_PACKAGE_NAME,
      },
    },
  );

  await app.listen();
}
bootstrap();
