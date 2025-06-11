import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    if (!createArtistDto.name || createArtistDto.grammy === undefined) {
      throw new BadRequestException('Missing required fields');
    }

    return await this.prisma.artist.create({
      data: {
        name: createArtistDto.name,
        grammy: createArtistDto.grammy,
      },
    });
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    return await this.prisma.artist.update({
      where: { id },
      data: {
        name: updateArtistDto.name ?? artist.name,
        grammy: updateArtistDto.grammy ?? artist.grammy,
      },
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    console.log(`Deleting artist ID: ${id}`);

    const updatedAlbums = await this.prisma.album.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    const updatedTracks = await this.prisma.track.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    console.log(
      `Updated ${updatedAlbums.count} albums and ${updatedTracks.count} tracks`,
    );

    await this.prisma.artist.delete({ where: { id } });

    return { message: `Artist with ID ${id} successfully deleted` };
  }
}
