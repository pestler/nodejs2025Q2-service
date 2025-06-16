import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './album.service';
import { AlbumsController } from './album.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TrackModule } from 'src/track/tracks.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [
    TrackModule,
    forwardRef(() => FavoritesModule),
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    }),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService, JwtService],
  exports: [AlbumsService],
})
export class AlbumModule {}
