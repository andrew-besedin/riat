import { CreateBookingRequest } from '@app/common/types/proto/bookings';
import Bookings from '@app/entities/bookings.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Bookings)
    private bookingsRepository: Repository<Bookings>,
  ) {}
  async createBooking(request: CreateBookingRequest) {
    await this.bookingsRepository.save(request);
  }
}
