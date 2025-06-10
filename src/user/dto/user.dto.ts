import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'User login' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'User password',
    minLength: 1,
    maxLength: 15,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'The password must contain at least 1 character' })
  @MaxLength(15, { message: 'The password must not exceed 15 characters' })
  password: string;
}

export class UpdatePasswordDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'oldPassword123', description: 'Old password' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ example: 'newSecurePassword123', description: 'New password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'The password must contain at least 1 character' })
  @MaxLength(15, { message: 'The password must not exceed 15 characters' })
  newPassword: string;
}
