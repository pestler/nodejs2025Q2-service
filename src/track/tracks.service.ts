import { DataBase } from './../database/database';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';
import { v4 as uuid, validate as isUUID } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(private readonly dataBase: DataBase) {}

  create(createTrackDto: CreateTrackDto): Track {
    const track = new Track({
      id: uuid(),
      ...createTrackDto,
    });
    this.dataBase.tracks.push(track);
    return track;
  }

  findAll(): Track[] {
    return this.dataBase.tracks;
  }

  findOne(id: string): Track {
    if (!isUUID(id)) {
      throw new HttpException('Invalid UUID format', StatusCodes.BAD_REQUEST);
    }

    const track = this.dataBase.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException("Track doesn't exist", StatusCodes.NOT_FOUND);
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    if (!isUUID(id)) {
      throw new HttpException('Invalid UUID format', StatusCodes.BAD_REQUEST);
    }

    const track = this.dataBase.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException("Track doesn't exist", StatusCodes.NOT_FOUND);
    }

    Object.assign(track, {
      name: updateTrackDto.name ?? track.name,
      artistId: updateTrackDto.artistId ?? track.artistId,
      albumId: updateTrackDto.albumId ?? track.albumId,
      duration: updateTrackDto.duration ?? track.duration,
    });

    return track;
  }

  remove(id: string): void {
    if (!isUUID(id)) {
      throw new HttpException('Invalid UUID format', StatusCodes.BAD_REQUEST);
    }

    const indexTrack = this.dataBase.tracks.findIndex(
      (track) => track.id === id,
    );
    if (indexTrack === -1) {
      throw new HttpException("Track doesn't exist", StatusCodes.NOT_FOUND);
    }

    this.dataBase.tracks.splice(indexTrack, 1);
  }
}
