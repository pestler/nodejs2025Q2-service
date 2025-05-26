import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private users = [];

  findAll() {
    return this.users.map(({ password, ...user }) => user);
  }

  create(userDto) {
    const user = {
      id: uuidv4(),
      ...userDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(user);
    return { id: user.id, login: user.login, version: user.version };
  }
}
