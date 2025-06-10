import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    if (!createAlbumDto.name || !createAlbumDto.year) {
      throw new BadRequestException('Missing required fields');
    }

    return await this.prisma.album.create({
      data: {
        name: createAlbumDto.name,
        year: createAlbumDto.year,
        artistId: createAlbumDto.artistId ?? null,
      },
    });
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    return await this.prisma.album.update({
      where: { id },
      data: {
        name: updateAlbumDto.name ?? album.name,
        year: updateAlbumDto.year ?? album.year,
        artistId: updateAlbumDto.artistId ?? album.artistId,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    await this.prisma.album.delete({ where: { id } });

    await this.prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });
  }
}
