import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.entity';
import { LoginUserDto } from './dto/login-user-dto';
import { LoginResponseDto } from './dto/login-response-dto';
import { RegisterResponseDto } from './dto/register-response-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() newUser: User): Promise<RegisterResponseDto> {
    return this.authService.register(newUser);
  }
  @Post('login')
  login(@Body() newUser: LoginUserDto): Promise<LoginResponseDto> {
    return this.authService.loginUser(newUser);
  }
}
