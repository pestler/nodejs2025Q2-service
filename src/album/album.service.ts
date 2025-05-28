import { DataBase } from '../database/database';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { v4 as uuid, validate as isUUID } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(private readonly dataBase: DataBase) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    if (!createAlbumDto.name || !createAlbumDto.year) {
      throw new HttpException(
        'Missing required fields',
        StatusCodes.BAD_REQUEST,
      );
    }

    const album = new Album({
      id: uuid(),
      ...createAlbumDto,
    });

    this.dataBase.albums.push(album);
    return album;
  }

  findAll(): Album[] {
    return this.dataBase.albums;
  }

  findOne(id: string): Album {
    if (!isUUID(id)) {
      throw new HttpException('Invalid UUID', StatusCodes.BAD_REQUEST);
    }

    const album = this.dataBase.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException("Album doesn't exist", StatusCodes.NOT_FOUND);
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    if (!isUUID(id)) {
      throw new HttpException('Invalid UUID', StatusCodes.BAD_REQUEST);
    }

    const album = this.dataBase.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException("Album doesn't exist", StatusCodes.NOT_FOUND);
    }

    Object.assign(album, {
      name: updateAlbumDto.name ?? album.name,
      year: updateAlbumDto.year ?? album.year,
      artistId: updateAlbumDto.artistId ?? null,
    });

    return album;
  }

  remove(id: string): void {
    if (!isUUID(id)) {
      throw new HttpException('Invalid UUID', StatusCodes.BAD_REQUEST);
    }

    const indexAlbum = this.dataBase.albums.findIndex(
      (album) => album.id === id,
    );
    if (indexAlbum === -1) {
      throw new HttpException("Album doesn't exist", StatusCodes.NOT_FOUND);
    }

    this.dataBase.albums.splice(indexAlbum, 1);

    this.dataBase.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });

    this.dataBase.favorites.albums = new Set(
      Array.from(this.dataBase.favorites.albums).filter(
        (albumId) => albumId !== id,
      ),
    );
  }
}
