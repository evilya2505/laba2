import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from './users.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UpdateUserDto } from './dto/update-user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';

@Controller('users')
@ApiTags('Пользователи')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'Изменение пароля пользователя' })
  @UseGuards(JwtAuthGuard)
  @Put('change-password/:id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatedUser: UpdatePasswordDto,
  ): Promise<Boolean> {
    return this.usersService.updatePassword(+id, updatedUser);
  }

  @ApiOperation({ summary: 'Изменение информации о пользователе' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatedUser: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return this.usersService.update(+id, updatedUser);
  }

  @ApiOperation({ summary: 'Удаление пользователя по id' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Boolean {
    return this.usersService.remove(+id);
  }
}
