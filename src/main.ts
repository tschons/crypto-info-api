import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Crypto Info API')
    .setDescription('API for Cryptocurrency Information')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
