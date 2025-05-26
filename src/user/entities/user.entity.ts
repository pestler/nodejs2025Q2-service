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
  readonly id: string;

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
    example: new Date().getTime(),
    description: 'Created timestamp',
  })
  readonly createdAt: number;

  @ApiProperty({
    example: new Date().getTime(),
    description: 'Updated timestamp',
  })
  readonly updatedAt: number;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
