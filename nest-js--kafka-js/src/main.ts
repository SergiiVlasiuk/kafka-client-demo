import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applicationOptions, kafkajsMicroserviceConfig } from './configurations';

async function bootstrap() {
  let logger = new Logger(bootstrap.name);
  const port = 3000
  const app = await NestFactory.create(AppModule, applicationOptions);
  app.connectMicroservice(kafkajsMicroserviceConfig)
  await app.startAllMicroservicesAsync()
  await app.listen(port, () => logger.log(`service has been started on port ${port}`));
}
bootstrap();
