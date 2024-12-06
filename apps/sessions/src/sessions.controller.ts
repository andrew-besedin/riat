import { Controller } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import {
  GetSessionsListResponse,
  SessionsServiceController,
  SessionsServiceControllerMethods,
} from '@app/common/types/proto/sessions';

@Controller()
@SessionsServiceControllerMethods()
export class SessionsController implements SessionsServiceController {
  constructor(private readonly sessionsService: SessionsService) {}

  async getSessionsList(): Promise<GetSessionsListResponse> {
    return {
      sessions: await this.sessionsService.getSessionsList(),
    };
  }
}
