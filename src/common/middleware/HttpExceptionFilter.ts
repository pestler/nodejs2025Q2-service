import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggingService } from 'src/logger/logging.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { method, url } = host.switchToHttp().getRequest();
    const response = host.switchToHttp().getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : { error: 'Internal Server Error' };

    this.loggingService.error('HTTP Exception', {
      method,
      url,
      status,
      message,
    });

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: url,
      message,
    });
  }
}
