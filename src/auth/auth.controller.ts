import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/public.decorator';
import { LoginDto } from './login.dto';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { RefreshTokenDto } from './refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.login,
      loginDto.password,
    );
    return this.authService.generateTokens(user);
  }

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.createUser(createUserDto);
    const tokens = await this.authService.generateTokens(user);

    return {
      id: user.id,
      ...tokens,
    };
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken);
  }
}
