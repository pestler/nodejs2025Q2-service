import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'The password must contain at least 1 character' })
  @MaxLength(15, { message: 'The password must not exceed 15 characters' })
  password: string;
}

export class UpdatePasswordDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'The password must contain at least 1 character' })
  @MaxLength(15, { message: 'The password must not exceed 15 characters' })
  newPassword: string;
}
