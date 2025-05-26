import { Module } from '@nestjs/common';
import { AlbumsService } from './album.service';
import { AlbumsController } from './album.controller';
import { DataBaseModule } from 'src/database/database.module';

@Module({
  imports: [DataBaseModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumModule {}
