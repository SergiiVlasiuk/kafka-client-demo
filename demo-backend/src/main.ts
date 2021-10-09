import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const logger = new Logger('bootstrap');
async function bootstrap() {
  const port = 8081;
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'verbose', 'log', 'debug'],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () =>
    logger.log(`application has been started on ${port} port`),
  );
}
bootstrap();
