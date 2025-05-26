import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document: OpenAPIObject = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
