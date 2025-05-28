import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DataBase } from 'src/database/database';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly dataBase: DataBase) {}

  HidePasswordUser(user: User): Omit<User, 'password'> {
    const rest = { ...user };
    delete rest.password;
    return rest;
  }
  create(createUserDto: CreateUserDto): Omit<User, 'password'> {
    const { login, password } = createUserDto;

    const userInfo = {
      id: uuid(),
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    const entity = new User({ login, password, ...userInfo });

    this.dataBase.addUser(entity);

    return this.HidePasswordUser(entity);
  }
  findAll(): Omit<User, 'password'>[] {
    return this.dataBase.getUsers().map(this.HidePasswordUser);
  }

  findOne(id: string): Omit<User, 'password'> {
    const user = this.dataBase.findUserById(id);
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    return this.HidePasswordUser(user);
  }

  update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Omit<User, 'password'> {
    const user = this.dataBase.findUserById(id);
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException(
        'Old password is incorrect',
        HttpStatus.FORBIDDEN,
      );
    }

    Object.assign(user, {
      password: updatePasswordDto.newPassword,
      updatedAt: new Date().getTime(),
      version: user.version + 1,
    });

    return this.HidePasswordUser(user);
  }

  remove(id: string): string {
    if (!this.dataBase.removeUser(id)) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }

    return `User with id=${id} deleted`;
  }
}
