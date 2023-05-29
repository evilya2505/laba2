import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.entity';
import { LoginUserDto } from './dto/login-user-dto';
import { LoginResponseDto } from './dto/login-response-dto';
import { RegisterResponseDto } from './dto/register-response-dto';
import { CreateUserDto } from 'src/users/dto/create-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() newUser: CreateUserDto): Promise<RegisterResponseDto> {
    return this.authService.register(newUser);
  }
  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() newUser: LoginUserDto): Promise<LoginResponseDto> {
    return this.authService.loginUser(newUser);
  }
}
