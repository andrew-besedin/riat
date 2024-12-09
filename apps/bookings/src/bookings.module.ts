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
import config from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.development.env' : '.env',
      load: [config],
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
            urls: [
              {
                protocol: 'amqp',
                hostname: process.env.RABBITMQ_HOST,
                username: process.env.RABBITMQ_DEFAULT_USER,
                password: process.env.RABBITMQ_DEFAULT_PASS,
              },
            ],
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
