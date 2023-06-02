import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class GuestDto {
  @ApiProperty({ example: 'Макар', description: 'Имя' })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ example: 'Соловьев', description: 'Фамилия' })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ example: '571177516610', description: 'Номер телефона' })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  phonenumber: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty({ example: 'hedwig@live.com', description: 'Электронная почта' })
  emailaddress: string;
}
