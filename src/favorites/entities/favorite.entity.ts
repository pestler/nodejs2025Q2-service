import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class Favorites {
  @ApiProperty({ type: [Artist], description: 'List of favorite artists' })
  artists: Artist[];

  @ApiProperty({ type: [Album], description: 'List of favorite albums' })
  albums: Album[];

  @ApiProperty({ type: [Track], description: 'List of favorite tracks' })
  tracks: Track[];
}
