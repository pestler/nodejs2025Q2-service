import {
  Injectable,
  OnModuleDestroy,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
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

  async onModuleInit() {
    this.logger.log('Connecting to Prisma...');
    await this.$connect();
  }

  async onModuleDestroy() {
    this.logger.log('Closing Prisma connection...');
    await this.$disconnect();
  }

  async executeQuery<T>(query: () => Promise<T>): Promise<T | null> {
    try {
      return await query();
    } catch (error) {
      this.logger.error(`Database query failed: ${error.message}`, error.stack);
      return null;
    }
  }
}
