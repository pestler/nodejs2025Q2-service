import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UsePipes,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';

import { User } from './entities/user.entity';
import { validationPipe } from 'src/pipes/validation.pipe';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(validationPipe)
  create(@Body() createUserDto: CreateUserDto): Omit<User, 'password'> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Omit<User, 'password'>[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Omit<User, 'password'> {
    const user = this.userService.findOne(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  @Put(':id')
  @UsePipes(validationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() UpdatePasswordDto: UpdatePasswordDto,
  ): Omit<User, 'password'> {
    return this.userService.update(id, UpdatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string): void {
    this.userService.remove(id);
  }
}
