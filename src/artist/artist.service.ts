import { DataBase } from '../database/database';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { v4 as uuid, validate as isUUID } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(private readonly dataBase: DataBase) {}

  create(createArtistDto: CreateArtistDto): Artist {
    if (!createArtistDto.name || createArtistDto.grammy === undefined) {
      throw new HttpException(
        'Missing required fields',
        StatusCodes.BAD_REQUEST,
      );
    }

    const artist = new Artist({ id: uuid(), ...createArtistDto });
    this.dataBase.artists.push(artist);
    return artist;
  }

  findAll(): Artist[] {
    return this.dataBase.artists;
  }

  findOne(id: string): Artist {
    if (!isUUID(id)) {
      throw new HttpException('Invalid UUID', StatusCodes.BAD_REQUEST);
    }

    const artist = this.dataBase.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException("Artist doesn't exist", StatusCodes.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    if (!isUUID(id)) {
      throw new HttpException('Invalid UUID', StatusCodes.BAD_REQUEST);
    }

    const artist = this.dataBase.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException("Artist doesn't exist", StatusCodes.NOT_FOUND);
    }

    Object.assign(artist, {
      name: updateArtistDto.name ?? artist.name,
      grammy: updateArtistDto.grammy ?? artist.grammy,
    });

    return artist;
  }

  remove(id: string): void {
    if (!isUUID(id)) {
      throw new HttpException('Invalid UUID', StatusCodes.BAD_REQUEST);
    }

    const indexArtist = this.dataBase.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (indexArtist === -1) {
      throw new HttpException("Artist doesn't exist", StatusCodes.NOT_FOUND);
    }

    this.dataBase.artists.splice(indexArtist, 1);

    this.dataBase.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    this.dataBase.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    this.dataBase.favorites.artists = new Set(
      Array.from(this.dataBase.favorites.artists).filter(
        (artistId) => artistId !== id,
      ),
    );
  }
}
