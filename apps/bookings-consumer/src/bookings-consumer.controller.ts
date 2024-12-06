import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class BookingsConsumerController {
  @EventPattern('booked')
  onBooked() {
    Logger.log('EMAIL SENT!!!');
  }
}
