import { NestFactory } from '@nestjs/core';
import { BookingsConsumerModule } from './bookings-consumer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BookingsConsumerModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'bookings_queue',
      },
    },
  );

  app.listen();
}
bootstrap();
