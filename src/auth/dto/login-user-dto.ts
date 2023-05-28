import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'test@mail.ru', description: 'Электронная почта' })
  @IsString()
  @IsEmail()
  @MinLength(3)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty({ example: '123', description: 'Пароль' })
  password: string;
}
