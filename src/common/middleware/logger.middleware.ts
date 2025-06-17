import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from 'src/logger/logger.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, url, body } = req;

    res.on('finish', () => {
      if (url.includes('/health') || url.includes('/favicon.ico')) return;

      const duration = Date.now() - startTime;
      this.loggingService.log(url, method, body, res.statusCode, duration);
    });
    next();
  }
}
