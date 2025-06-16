import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject, DocumentBuilder } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import 'dotenv/config';
import { LoggingService } from './logger/logger.service';
import { HttpExceptionFilter } from './common/middleware/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);
  const port = Number(process.env.PORT) || 4000;

  app.useLogger(loggingService);
  app.useGlobalFilters(new HttpExceptionFilter(loggingService));

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Auto-generated API specification')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  if (!existsSync('./doc')) {
    mkdirSync('./doc');
  }
  writeFileSync('./doc/api.yaml', YAML.stringify(document, 2));

  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
  loggingService.log(`🚀 App listening on port ${port}`);
}

bootstrap();
