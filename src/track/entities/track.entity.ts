import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcdef123456',
    description: 'Track ID',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Bohemian Rhapsody', description: 'Track name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 354, description: 'Track duration in seconds' })
  @IsInt()
  @IsNotEmpty()
  duration: number;

  @ApiProperty({
    example: 'f2e3d4c5-b6a7-8901-abcdef654321',
    description: 'Artist ID',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  artistId: string;

  @ApiProperty({
    example: 'b7c8d9e0-f1g2-3456-hijk78901234',
    description: 'Album ID',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  albumId: string;

  @ApiProperty({ example: true, description: 'Is track marked as favorite' })
  @IsBoolean()
  isFavorite: boolean;
}
