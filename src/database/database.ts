import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favorites } from 'src/favorites/entities/favorite.entity';

@Injectable()
export class DataBase {
  public readonly users: User[] = [];
  public readonly artists: Artist[] = [];
  public readonly albums: Album[] = [];
  public readonly tracks: Track[] = [];
  public readonly favorites: {
    artists: Set<string>;
    albums: Set<string>;
    tracks: Set<string>;
  } = {
    artists: new Set<string>(),
    albums: new Set<string>(),
    tracks: new Set<string>(),
  };

  addUser(user: User): void {
    this.users.push(user);
  }

  getUsers(): ReadonlyArray<User> {
    return this.users;
  }

  findUserById(id: string): User | null {
    return this.users.find((user) => user.id === id) ?? null;
  }

  removeUser(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  getFavorites(): Favorites {
    return {
      artists: Array.from(this.favorites.artists).map((id) =>
        this.artists.find((artist) => artist.id === id),
      ),
      albums: Array.from(this.favorites.albums).map((id) =>
        this.albums.find((album) => album.id === id),
      ),
      tracks: Array.from(this.favorites.tracks).map((id) =>
        this.tracks.find((track) => track.id === id),
      ),
    };
  }
}
