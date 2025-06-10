import { Module } from '@nestjs/common';
import { AlbumsService } from './album.service';
import { AlbumsController } from './album.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumModule {}
