import { NestFactory } from '@nestjs/core';
import { SecondAppModule } from './second-app.module';

async function bootstrap() {
  const app = await NestFactory.create(SecondAppModule);
  await app.listen(3002);
}
bootstrap();
