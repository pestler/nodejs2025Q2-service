import { Global, Module, Logger } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    {
      provide: PrismaService,
      useClass: PrismaService,
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {
  private readonly logger = new Logger(PrismaModule.name);

  constructor() {
    this.logger.log('PrismaModule initialized');
  }
}
