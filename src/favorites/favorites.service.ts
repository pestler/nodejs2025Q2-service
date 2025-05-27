import { DataBase } from 'src/database/database';
import { HttpException, Injectable } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { validate as isUUID } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(private readonly dataBase: DataBase) {}

  findAll() {
    return {
      artists: this.dataBase.artists.filter((artist) =>
        this.dataBase.favorites.artists.has(artist.id),
      ),
      albums: this.dataBase.albums.filter((album) =>
        this.dataBase.favorites.albums.has(album.id),
      ),
      tracks: this.dataBase.tracks.filter((track) =>
        this.dataBase.favorites.tracks.has(track.id),
      ),
    };
  }

  private validateId(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid UUID format', StatusCodes.BAD_REQUEST);
    }
  }

  createTrack(id: string) {
    this.validateId(id);
    const track = this.dataBase.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException(
        "Track doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
    this.dataBase.favorites.tracks.add(id);
    return {
      message: `Track id=${id} added to favorites`,
      statusCode: StatusCodes.CREATED,
    };
  }

  removeTrack(id: string): void {
    this.validateId(id);
    if (!this.dataBase.favorites.tracks.has(id)) {
      throw new HttpException(
        "Track isn't in favorites",
        StatusCodes.NOT_FOUND,
      );
    }
    this.dataBase.favorites.tracks.delete(id);
  }

  createAlbum(id: string) {
    this.validateId(id);
    const album = this.dataBase.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException(
        "Album doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
    this.dataBase.favorites.albums.add(id);
    return {
      message: `Album id=${id} added to favorites`,
      statusCode: StatusCodes.CREATED,
    };
  }

  removeAlbum(id: string): void {
    this.validateId(id);
    if (!this.dataBase.favorites.albums.has(id)) {
      throw new HttpException(
        "Album isn't in favorites",
        StatusCodes.NOT_FOUND,
      );
    }
    this.dataBase.favorites.albums.delete(id);
  }

  createArtist(id: string) {
    this.validateId(id);
    const artist = this.dataBase.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException(
        "Artist doesn't exist",
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
    this.dataBase.favorites.artists.add(id);
    return {
      message: `Artist id=${id} added to favorites`,
      statusCode: StatusCodes.CREATED,
    };
  }

  removeArtist(id: string): void {
    this.validateId(id);
    if (!this.dataBase.favorites.artists.has(id)) {
      throw new HttpException(
        "Artist isn't in favorites",
        StatusCodes.NOT_FOUND,
      );
    }
    this.dataBase.favorites.artists.delete(id);
  }
}
