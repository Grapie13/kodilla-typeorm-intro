import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  getAllUsers() {
    const users = this.usersService.getAllUsers();

    return users;
  }

  @Get('/:id')
  getUserById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = this.usersService.getUserById(id);

    return user;
  }

  @Post('')
  createUser(@Body() userDto: CreateUserDto) {
    const user = this.usersService.createUser(userDto);

    return user;
  }

  @Patch('/:id')
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() userDto: UpdateUserDto,
  ) {
    const user = this.usersService.updateUser(id, userDto);

    return user;
  }

  @Delete('/:id')
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = this.usersService.deleteUser(id);

    return user;
  }
}
