import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import 'dotenv/config';
import { LoggingService } from './logger/logging.service';
import { HttpExceptionFilter } from './common/middleware/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);
  const port = Number(process.env.PORT) || 4000;

  app.useLogger(loggingService);
  app.useGlobalFilters(new HttpExceptionFilter(loggingService));

  const document: OpenAPIObject = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
  loggingService.log(`🚀 App listening on port ${port}`);
}

bootstrap();
