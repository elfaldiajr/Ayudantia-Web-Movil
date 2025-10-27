import { Body, Controller, Post, Get, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto : CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  
  @Get()
  async findAll() {
    return this.usersService.findAll()
  }
}
