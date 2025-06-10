import { Module, MiddlewareConsumer, NestModule, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/tracks.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggingModule } from './logger/logging.module';
import { LoggingMiddleware } from './common/middleware/logging.middleeware';
import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    PrismaModule,
    LoggingModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
