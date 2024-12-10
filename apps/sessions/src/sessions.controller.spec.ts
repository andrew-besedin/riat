import { Test, TestingModule } from '@nestjs/testing';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import Sessions from '@app/entities/sessions.entity';

describe('SessionsController', () => {
  let sessionsController: SessionsController;

  const mockSessions = [
    {
      id: 1,
      start_time: new Date(0),
      booked_seats: ['A1', 'A2'],
      hall: {
        id: 1,
      },
      film: {
        id: 1,
      },
    },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SessionsController],
      providers: [
        SessionsService,
        {
          provide: getRepositoryToken(Sessions),
          useValue: {
            find: () => {
              return mockSessions;
            },
          },
        },
      ],
    }).compile();

    sessionsController = app.get<SessionsController>(SessionsController);
  });

  describe('getSessionsList', () => {
    it('should return mocked sessions list', async () => {
      expect(await sessionsController.getSessionsList()).toEqual({
        sessions: [
          {
            id: 1,
            hallId: 1,
            filmId: 1,
            startTime: 0,
            bookedSeats: ['A1', 'A2'],
          },
        ],
      });
    });
  });
});
