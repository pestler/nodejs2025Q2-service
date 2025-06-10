import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return this.favoritesService.findAll();
  }

  @Post(':entity/:id')
  async createFavorite(
    @Param('entity') entity: 'track' | 'album' | 'artist',
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.favoritesService.createFavorite(entity, id);
  }

  @Delete(':entity/:id')
  @HttpCode(204)
  async removeFavorite(
    @Param('entity') entity: 'track' | 'album' | 'artist',
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.favoritesService.removeFavorite(entity, id);
  }
}
