import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcdef123456',
    description: 'Album ID',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Thriller', description: 'Album name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1982, description: 'Release year' })
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    example: 'f2e3d4c5-b6a7-8901-abcdef654321',
    description: 'Artist ID',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  artistId: string;

  @ApiProperty({
    example: true,
    description: 'Marks album as favorite',
  })
  @IsNotEmpty()
  isFavorite: boolean;
}
