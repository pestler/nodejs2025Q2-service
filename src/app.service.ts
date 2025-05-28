import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private readonly port = process.env.PORT ?? 4000;

  constructor() {
    this.logger.log(`AppService initialized on port ${this.port}`);
  }

  getHello(): string {
    this.logger.log('getHello() was called');
    return `Home Library Service: You can find documentation at the: http://localhost:${this.port}/doc/`;
  }
}
