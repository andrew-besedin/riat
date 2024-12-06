import { Controller, Logger } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import {
  BookingsServiceController,
  BookingsServiceControllerMethods,
  CreateBookingRequest,
  CreateBookingResponse,
} from '@app/common/types/proto/bookings';

@Controller()
@BookingsServiceControllerMethods()
export class BookingsController implements BookingsServiceController {
  constructor(private readonly bookingsService: BookingsService) {}

  async createBooking(
    request: CreateBookingRequest,
  ): Promise<CreateBookingResponse> {
    Logger.log('createBooking gRPC call: ', request);
    await this.bookingsService.createBooking(request);
    return { success: true };
  }
}
