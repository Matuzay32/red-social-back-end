import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Red social documentacion')
    .setDescription('Esta api simula una red social')
    .setVersion('1.0')
    .addTag('users')
    .addTag('countrys')
    .addTag('sentimental')
    .addTag('auth')
    .addTag('distributions')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(2000);
}
bootstrap();
