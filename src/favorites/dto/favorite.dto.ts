import { IsUUID, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcdef123456',
    description: 'Album ID',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  albumId?: string;

  @ApiProperty({
    example: 'f2e3d4c5-b6a7-8901-abcdef654321',
    description: 'Artist ID',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  artistId?: string;

  @ApiProperty({
    example: 'b7c8d9e0-f1g2-3456-hijk78901234',
    description: 'Track ID',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  trackId?: string;
}

export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {}
