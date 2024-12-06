import { Controller, Get, Logger } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}
  @Get('get-all')
  getAll() {
    Logger.log('/sessions/get-all call');
    return this.sessionsService.getAll();
  }
}
