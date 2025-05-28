import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcdef123456',
    description: 'Artist ID',
  })
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ example: 'Michael Jackson', description: 'Artist name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: true,
    description: 'Has Grammy award',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  grammy?: boolean;

  constructor(artist: Partial<Artist>) {
    Object.assign(this, artist);
    this.grammy = artist.grammy ?? false;
  }
}
