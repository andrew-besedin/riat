import {
  BOOKINGS_SERVICE_NAME,
  BookingsServiceClient,
} from '@app/common/types/proto/bookings';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class BookingsService {
  private bookingsService: BookingsServiceClient;
  constructor(@Inject(BOOKINGS_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.bookingsService = this.client.getService<BookingsServiceClient>(
      BOOKINGS_SERVICE_NAME,
    );
  }
  createBooking(request: any) {
    return this.bookingsService.createBooking(request);
  }
}
