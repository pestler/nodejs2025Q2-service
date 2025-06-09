import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

    this.logger.log('PrismaService initialized');
  }

  async onModuleDestroy() {
    this.logger.log('Closing Prisma connection...');
    await this.$disconnect();
  }

  async executeQuery<T>(query: () => Promise<T>): Promise<T | null> {
    try {
      return await query();
    } catch (error) {
      this.logger.error('Database query failed', error);
      return null;
    }
  }
}
