import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  private generateAccessToken(userId: string, login: string): string {
    return this.jwtService.sign(
      { userId, login },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    );
  }

  private generateRefreshToken(userId: string, login: string): string {
    return this.jwtService.sign(
      { userId, login },
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );
  }

  async signup(
    login: string,
    password: string,
  ): Promise<{ accessToken: string; userId: string; message: string }> {
    const existingUser = await this.usersService.findByLogin(login);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const salt = Number(process.env.CRYPT_SALT) || 10;
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await this.usersService.create({
      login,
      password: passwordHash,
    });

    const accessToken = this.generateAccessToken(newUser.id, newUser.login);
    return {
      accessToken,
      userId: newUser.id,
      message: 'User successfully registered',
    };
  }

  async login(
    login: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; userId: string }> {
    const user = await this.usersService.findByLogin(login);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid login or password');
    }

    return {
      accessToken: this.generateAccessToken(user.id, user.login),
      refreshToken: this.generateRefreshToken(user.id, user.login),
      userId: user.id,
    };
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      const user = await this.usersService.findOne(payload.userId);
      if (!user) {
        throw new ForbiddenException('Invalid refresh token');
      }

      return {
        accessToken: this.generateAccessToken(user.id, user.login),
        refreshToken: this.generateRefreshToken(user.id, user.login),
      };
    } catch (error) {
      throw error instanceof TokenExpiredError
        ? new ForbiddenException('Refresh token has expired')
        : new ForbiddenException('Invalid refresh token');
    }
  }
}
