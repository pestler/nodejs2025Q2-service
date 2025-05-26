import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Favorites } from './interface';

@Injectable()
export class DataBase {
  private readonly users: User[] = [];
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  addUser(user: User): void {
    this.users.push(user);
  }

  getUsers(): ReadonlyArray<User> {
    return this.users;
  }

  findUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  removeUser(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
