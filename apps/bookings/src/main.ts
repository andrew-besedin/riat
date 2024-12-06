import { NestFactory } from '@nestjs/core';
import { BookingsModule } from './bookings.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { BOOKINGS_PACKAGE_NAME } from '@app/common/types/proto/bookings';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BookingsModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50051',
        protoPath: join(__dirname, './proto/bookings.proto'),
        package: BOOKINGS_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
