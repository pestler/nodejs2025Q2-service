import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { validate as isUUID } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return {
      artists: await this.prisma.artist.findMany({
        where: { isFavorite: true },
        select: { id: true, name: true, grammy: true },
      }),
      albums: await this.prisma.album.findMany({
        where: { isFavorite: true },
        select: { id: true, name: true, year: true, artistId: true },
      }),
      tracks: await this.prisma.track.findMany({
        where: { isFavorite: true },
        select: {
          id: true,
          name: true,
          duration: true,
          albumId: true,
          artistId: true,
        },
      }),
    };
  }

  private validateId(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
  }

  async createFavorite(entity: 'track' | 'album' | 'artist', id: string) {
    this.validateId(id);

    let item;
    if (entity === 'track') {
      item = await this.prisma.track.findUnique({ where: { id } });
    } else if (entity === 'album') {
      item = await this.prisma.album.findUnique({ where: { id } });
    } else if (entity === 'artist') {
      item = await this.prisma.artist.findUnique({ where: { id } });
    } else {
      throw new BadRequestException('Invalid entity type');
    }

    if (!item) {
      throw new UnprocessableEntityException(
        `${entity.charAt(0).toUpperCase() + entity.slice(1)} doesn't exist`,
      );
    }

    if (entity === 'track') {
      await this.prisma.track.update({
        where: { id },
        data: { isFavorite: true },
      });
    } else if (entity === 'album') {
      await this.prisma.album.update({
        where: { id },
        data: { isFavorite: true },
      });
    } else if (entity === 'artist') {
      await this.prisma.artist.update({
        where: { id },
        data: { isFavorite: true },
      });
    }

    return {
      message: `${entity} id=${id} added to favorites`,
      statusCode: 201,
    };
  }

  async removeFavorite(entity: 'track' | 'album' | 'artist', id: string) {
    this.validateId(id);

    let item;
    if (entity === 'track') {
      item = await this.prisma.track.findUnique({ where: { id } });
    } else if (entity === 'album') {
      item = await this.prisma.album.findUnique({ where: { id } });
    } else if (entity === 'artist') {
      item = await this.prisma.artist.findUnique({ where: { id } });
    } else {
      throw new BadRequestException('Invalid entity type');
    }

    if (!item || !item.isFavorite) {
      throw new NotFoundException(`${entity} isn't in favorites`);
    }

    if (entity === 'track') {
      await this.prisma.track.update({
        where: { id },
        data: { isFavorite: false },
      });
    } else if (entity === 'album') {
      await this.prisma.album.update({
        where: { id },
        data: { isFavorite: false },
      });
    } else if (entity === 'artist') {
      await this.prisma.artist.update({
        where: { id },
        data: { isFavorite: false },
      });
    }
  }
}
