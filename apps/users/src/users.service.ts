import { CreateUserRequest } from '@app/common/types/proto/users';
import Users from '@app/entities/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async createUser(request: CreateUserRequest) {
    await this.usersRepository.save(request);

    return {
      success: true,
    };
  }
}
