import { CreateBookingRequest } from '@app/common/types/proto/bookings';
import Bookings from '@app/entities/bookings.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Bookings)
    private bookingsRepository: Repository<Bookings>,
    @Inject('BOOKINGS_RMQ') private readonly rabbitClient: ClientProxy,
  ) {}
  async createBooking(request: CreateBookingRequest) {
    await this.bookingsRepository.save(request);
    this.rabbitClient.emit('booked', request);
  }
}
