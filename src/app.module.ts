import {
  Module,
  MiddlewareConsumer,
  NestModule,
  Global,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/tracks.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingModule } from './logger/logger.module';
import { LoggingMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user/user.controller';
import { FavoritesController } from './favorites/favorites.controller';
import { AlbumsController } from './album/album.controller';
import { TracksController } from './track/tracks.controller';
import { ArtistsController } from './artist/artist.controller';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggingService } from './logger/logger.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    PrismaModule,
    AuthModule,
    FavoritesModule,
    LoggingModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    }),
  ],
  controllers: [
    AppController,
    UserController,
    TracksController,
    ArtistsController,
    AlbumsController,
    FavoritesController,
  ],
  providers: [
    LoggingService,
    AppService,
    UserService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  exports: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
