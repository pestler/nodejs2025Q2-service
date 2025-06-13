import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({ example: 'Thriller', description: 'Album name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 1982, description: 'Release year' })
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcdef123456',
    description: 'Artist ID',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  artistId?: string;
}

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}
