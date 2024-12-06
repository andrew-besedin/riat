import { Module } from '@nestjs/common';
import { BookingsConsumerController } from './bookings-consumer.controller';

@Module({
  imports: [],
  controllers: [BookingsConsumerController],
  providers: [],
})
export class BookingsConsumerModule {}
