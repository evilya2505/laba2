import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user-dto';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(newUser: CreateUserDto): Promise<User> {
    newUser.password = await this.hashPassword(newUser.password);

    const user = this.userRepository.create();

    user.lastname = newUser.lastname;
    user.firstname = newUser.firstname;
    user.email = newUser.email;
    user.password = newUser.password;

    await this.userRepository.save(user);

    return user;
  }

  async publicUser(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
      },
    });
  }

  async update(id: number, updatedUser: UpdateUserDto): Promise<UpdateUserDto> {
    const user = await this.userRepository.findOne({ where: { id } });

    user.lastname = updatedUser.lastname;
    user.firstname = updatedUser.firstname;
    user.email = updatedUser.email;

    await this.userRepository.save(user);

    return await this.publicUser(id);
  }

  async updatePassword(
    id: number,
    passwords: UpdatePasswordDto,
  ): Promise<Boolean> {
    const user = await this.userRepository.findOne({ where: { id } });

    const validatePassword = await bcrypt.compare(
      passwords.oldPassword,
      user.password,
    );

    if (validatePassword) {
      user.password = await this.hashPassword(passwords.oldPassword);
      await this.userRepository.save(user);
      return true;
    }

    return false;
  }

  remove(id: number): Boolean {
    this.userRepository.delete({ id });

    return true;
  }
}
