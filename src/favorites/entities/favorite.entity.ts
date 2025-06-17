import { ApiProperty } from '@nestjs/swagger';

export class Favorites {
  @ApiProperty({ type: () => Object, description: 'List of favorite artists' })
  artists: {
    id: string;
    name: string;
    grammy: boolean;
    isFavorite: boolean;
  }[];

  @ApiProperty({ type: () => Object, description: 'List of favorite albums' })
  albums: {
    id: string;
    name: string;
    year: number;
    artistId?: string;
    isFavorite: boolean;
  }[];

  @ApiProperty({ type: () => Object, description: 'List of favorite tracks' })
  tracks: {
    id: string;
    name: string;
    duration: number;
    artistId?: string;
    albumId?: string;
    isFavorite: boolean;
  }[];
}
