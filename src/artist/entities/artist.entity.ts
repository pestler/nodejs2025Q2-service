import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcdef123456',
    description: 'Artist ID',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Michael Jackson', description: 'Artist name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: true, description: 'Has Grammy award' })
  @IsBoolean()
  grammy: boolean;

  @ApiProperty({ example: false, description: 'Is artist marked as favorite' })
  @IsBoolean()
  isFavorite: boolean;
}
