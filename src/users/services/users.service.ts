import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRequireUniqueEmailException } from '../exceptions/user-require-unique-email.exception';
import { UsersRepository } from '../repositories/users.repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();

    return users.map((user) => UserDto.fromEntity(user));
  }

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return UserDto.fromEntity(user);
  }

  private getUserByEmail(email: string) {
    return this.usersRepository.findOneByEmail(email);
  }

  async createUser(userDto: CreateUserDto): Promise<UserDto> {
    let user = await this.getUserByEmail(userDto.email);

    if (user) {
      throw new UserRequireUniqueEmailException();
    }

    user = UserEntity.create({
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email,
      birthday: userDto.birthday,
    });
    await this.usersRepository.save(user);

    return UserDto.fromEntity(user);
  }

  async updateUser(id: string, userDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    user.firstName = userDto.firstName ?? user.firstName;
    user.lastName = userDto.lastName ?? user.lastName;
    user.email = userDto.email ?? user.email;
    user.birthday = userDto.birthday
      ? new Date(userDto.birthday)
      : user.birthday;
    await this.usersRepository.save(user);

    return UserDto.fromEntity(user);
  }

  async deleteUser(id: string): Promise<UserDto> {
    const user = await this.usersRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    await this.usersRepository.remove(user);

    return UserDto.fromEntity(user);
  }
}
