import { Body, Controller, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}
  @Post('/create')
  createBooking(@Body() body: any) {
    return this.bookingsService.createBooking(body);
  }
}
