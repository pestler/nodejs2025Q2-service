import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findByLogin(login);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid login or password');
    }

    const { password: _, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      createdAt: user.createdAt instanceof Date ? user.createdAt.getTime() : user.createdAt,
      updatedAt: user.updatedAt instanceof Date ? user.updatedAt.getTime() : user.updatedAt,
    };
  }

  async generateTokens(user: Omit<User, 'password'>) {
    const payload = { userId: user.id, login: user.login };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }

  async login(loginDto: any) {
    const user = await this.validateUser(loginDto.login, loginDto.password);
    return this.generateTokens(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = await this.userService.findByLogin(createUserDto.login);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    return this.userService.create(createUserDto);
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      return this.generateTokens(payload);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
