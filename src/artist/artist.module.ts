import { Module } from '@nestjs/common';
import { ArtistsService } from './artist.service';
import { ArtistsController } from './artist.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistModule {}
