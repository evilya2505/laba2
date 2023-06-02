import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({ example: '123', description: 'Старый пароль' })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ example: '123', description: 'Новый пароль' })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  newPassword: string;
}
