import { GetSessionsListResponse } from '@app/common/types/proto/sessions';
import Sessions from '@app/entities/sessions.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Sessions)
    private sessionsRepository: Repository<Sessions>,
  ) {}
  async getSessionsList(): Promise<GetSessionsListResponse['sessions']> {
    return (
      await this.sessionsRepository.find({ relations: ['hall', 'film'] })
    ).map((e) => ({
      id: e.id,
      hallId: e.hall.id,
      filmId: e.film.id,
      startTime: e.start_time.getTime(),
      bookedSeats: e.booked_seats,
    }));
  }
}
