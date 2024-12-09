import { Module } from '@nestjs/common';
import { BookingsConsumerController } from './bookings-consumer.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        'environment/files/.resources.env',
        process.env.NODE_ENV === 'development' ? '.development.env' : '.env',
      ],
    }),
  ],
  controllers: [BookingsConsumerController],
  providers: [],
})
export class BookingsConsumerModule {}
