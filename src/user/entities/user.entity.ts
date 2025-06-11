import { IsNotEmpty, IsString, IsUUID, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @Exclude()
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcdef123456',
    description: 'User ID',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'john_doe', description: 'User login' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @Exclude()
  @ApiProperty({
    example: 'securePassword123',
    description: 'User password',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 1, description: 'User version' })
  @IsInt()
  version: number;

  @ApiProperty({
    example: new Date(),
    description: 'Created timestamp',
  })
  createdAt: bigint;

  @ApiProperty({
    example: new Date(),
    description: 'Updated timestamp',
  })
  updatedAt: bigint;
}
