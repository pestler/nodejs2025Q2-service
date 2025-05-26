import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Favorites } from './interface';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';

@Injectable()
export class DataBase {
  public users: User[] = [];

  public albums: Album[] = [];
  public tracks: Track[] = [];
  public favorites: Favorites = { artists: [], albums: [], tracks: [] };

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
