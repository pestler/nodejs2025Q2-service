import { Module, Global } from '@nestjs/common';
import { DataBase } from './database';

@Global()
@Module({
  providers: [DataBase],
  exports: [DataBase],
})
export class DataBaseModule {}
