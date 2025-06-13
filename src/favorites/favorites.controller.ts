import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.favoritesService.findAll();
  }

  @Post(':entity/:id')
  @UseGuards(JwtAuthGuard)
  async createFavorite(
    @Param('entity') entity: 'track' | 'album' | 'artist',
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.favoritesService.createFavorite(entity, id);
  }

  @Delete(':entity/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async removeFavorite(
    @Param('entity') entity: 'track' | 'album' | 'artist',
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.favoritesService.removeFavorite(entity, id);
  }
}
