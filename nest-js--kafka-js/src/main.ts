import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { kafkajsMicroserviceConfig } from './demo-kafka/kafkajaMicroserviceConfig';

async function bootstrap() {
  const port = 3000
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(kafkajsMicroserviceConfig)
  await app.startAllMicroservicesAsync()
  await app.listen(port, () => console.log(`service has been started on port ${port}`));
}
bootstrap();
