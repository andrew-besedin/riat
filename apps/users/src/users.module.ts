import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import Users from '@app/entities/users.entity';
import Bookings from '@app/entities/bookings.entity';
import Films from '@app/entities/films.entity';
import Halls from '@app/entities/halls.entity';
import Sessions from '@app/entities/sessions.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.development.env' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: 'postgres',
        password: process.env.DB_PASSWORD,
        entities: [Users, Bookings, Films, Halls, Sessions],
        synchronize: true,
      }),

      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    TypeOrmModule.forFeature([Users, Bookings, Films, Halls, Sessions]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
