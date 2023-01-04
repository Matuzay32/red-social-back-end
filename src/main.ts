import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Red social documentacion')
    .setDescription('Esta api simula una red social, similar a facebook ')
    .setVersion('1.0')

    .addTag('comments')
    .addTag('friends')
    .addTag('posts')
    .addTag('images')
    .addTag('users')
    .addTag('countrys')
    .addTag('sentimental')
    .addTag('auth')
    .addTag('distributions')
    .addTag('albums')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
