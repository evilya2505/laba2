import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { TokenModule } from 'src/token/token.module';
import { TokenSevice } from 'src/token/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User]), TokenModule],
  controllers: [AuthController],
  providers: [AuthService, TokenSevice, JwtService],
})
export class AuthModule {}
