import { NestFactory } from '@nestjs/core';
import { BookingsConsumerModule } from './bookings-consumer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(
    BookingsConsumerModule,
  );

  const configService = appContext.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BookingsConsumerModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          {
            protocol: 'amqp',
            hostname: configService.get('RABBITMQ_HOST'),
            port: 5672,
            password: configService.get('RABBITMQ_DEFAULT_PASS'),
            username: configService.get('RABBITMQ_DEFAULT_USER'),
          },
        ],
        queue: 'bookings_queue',
      },
    },
  );

  app.listen();
}
bootstrap();
