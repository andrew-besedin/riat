import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Bookings from '@app/entities/bookings.entity';
import { DataSource } from 'typeorm';
import Users from '@app/entities/users.entity';
import Sessions from '@app/entities/sessions.entity';
import Films from '@app/entities/films.entity';
import Halls from '@app/entities/halls.entity';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    ClientsModule.register({
      isGlobal: true,
      clients: [
        {
          name: 'BOOKINGS_RMQ',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'bookings_queue',
          },
        },
      ],
    }),
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
