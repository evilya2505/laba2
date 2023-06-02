import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UpdateUserDto } from './dto/update-user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';

@Controller('users')
@ApiTags('Пользователи')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'Изменение пароля пользователя' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Put('change-password/:id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatedUser: UpdatePasswordDto,
  ): Promise<Boolean> {
    return this.usersService.updatePassword(+id, updatedUser);
  }

  @ApiOperation({ summary: 'Изменение информации о пользователе' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatedUser: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return this.usersService.update(+id, updatedUser);
  }

  @ApiOperation({ summary: 'Удаление пользователя по id' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @Delete(':id')
  remove(@Param('id') id: string): Boolean {
    return this.usersService.remove(+id);
  }
}
