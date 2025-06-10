import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ example: 'Billie Jean', description: 'Track name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 300, description: 'Track duration in seconds' })
  @IsInt()
  @IsNotEmpty()
  duration: number;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcdef123456',
    description: 'Artist ID',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  artistId?: string;

  @ApiProperty({
    example: 'b7c8d9e0-f1g2-3456-hijk78901234',
    description: 'Album ID',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  albumId?: string;
}

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
