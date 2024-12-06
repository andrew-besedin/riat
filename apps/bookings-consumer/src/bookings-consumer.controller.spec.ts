import { Test, TestingModule } from '@nestjs/testing';
import { BookingsConsumerController } from './bookings-consumer.controller';
import { BookingsConsumerService } from './bookings-consumer.service';

describe('BookingsConsumerController', () => {
  let bookingsConsumerController: BookingsConsumerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookingsConsumerController],
      providers: [BookingsConsumerService],
    }).compile();

    bookingsConsumerController = app.get<BookingsConsumerController>(BookingsConsumerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(bookingsConsumerController.getHello()).toBe('Hello World!');
    });
  });
});
