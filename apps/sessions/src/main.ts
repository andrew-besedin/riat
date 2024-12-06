import { NestFactory } from '@nestjs/core';
import { SessionsModule } from './sessions.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SESSIONS_PACKAGE_NAME } from '@app/common/types/proto/sessions';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SessionsModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50051',
        protoPath: join(__dirname, './proto/sessions.proto'),
        package: SESSIONS_PACKAGE_NAME,
      },
    },
  );

  await app.listen();
}
bootstrap();
