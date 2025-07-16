import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);
  const logLevels = (configService.get('LOG_LEVELS') ?? 'log,error,warn').split(
    ',',
  );
  await appContext.close();

  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Crypto Info API')
    .setDescription('API for Cryptocurrency Information')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
