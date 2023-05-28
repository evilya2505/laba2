import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { GuestsModule } from './guests/guests.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsModule } from './bookings/booking.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config/dist';
import ConfigEnv from 'configurations';

@Module({
  imports: [
    // первый параметр, что используется глобально, второ параметр - объект конфигурации
    ConfigModule.forRoot({ isGlobal: true, load: [ConfigEnv] }),
    AuthModule,
    RoomsModule,
    UsersModule,
    FacilitiesModule,
    GuestsModule,
    BookingsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        dialect: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        name: configService.get('db_name'),
        synchronize: true,
        logging: 'all',
        entities: ['dist/**/*.entity{.ts,.js}'],
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
