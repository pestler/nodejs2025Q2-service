import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private readonly port: number;

  constructor() {
    const portEnv = process.env.PORT;
    if (!portEnv) {
      this.logger.warn(
        'PORT is not set in environment variables, using default: 4000',
      );
    }
    this.port = Number(portEnv) || 4000;
    this.logger.log(`AppService initialized on port ${this.port}`);
  }

  getHello(): string {
    this.logger.debug('getHello() was called');
    return `Home Library Service: You can find documentation at the: <a href="http://localhost:${this.port}/doc/">Documentation</a>`;
  }
}
