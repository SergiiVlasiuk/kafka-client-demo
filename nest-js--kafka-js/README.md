## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

#### first steps with kafka notes

```
npm i kafkajs
npm i @nestjs/microservices
```
`app.module.ts`
```
  app.connectMicroservice(kafkajsMicroserviceConfig)
  await app.startAllMicroservicesAsync()
```
```
nest g mo demo-kafka
```
 `implements OnModuleInit, OnModuleDestroy`
```
    @Client(kafkajsMicroserviceConfig)
    client: ClientKafka

    async onModuleInit() {
        console.log('[DemoKafkaModule] onModuleInit')
        this.client.subscribeToResponseOf('demo-topic')
        // this.client.subscribeToResponseOf('demo-topic.reply')
        await this.client.connect()
    }

    onModuleDestroy() {
        console.log('[DemoKafkaModule] onModuleDestroy')
        this.client.close()
    }
```
`kafkajaMicroserviceConfig.ts`
```
import { KafkaOptions, Transport } from "@nestjs/microservices";

export const kafkajsMicroserviceConfig: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
          groupId: 'demo-group',
      }
    //   ,
    //   subscribe: {
    //     topic: '/topic-(eu|us)-./i',
    //       fromBeginning: true
    //   }
    }
}
```

```
nest g mo demo-consumer
nest g co demo-consumer
```
`DemoConsumerController`
```
    @Get()
    getConsumerHello(): string {
        console.log('[DemoConsumerController] getConsumerHello')
        return 'hello consumer'
    }

    // @MessagePattern('demo-topic')
    @EventPattern('demo-topic')
    killDragon(@Payload() { value }, @Ctx() context: KafkaContext) {
        console.log(`[DemoConsumerController] Message: ${value}`);
        console.log(`[DemoConsumerController] Topic: ${context.getTopic()}`);
    }
```
```
nest g mo demo-producer
nest g co demo-producer
```
`kafkajaProducerConfig.ts`
```
import { KafkaOptions, Transport } from "@nestjs/microservices";

export const kafkajsProducerConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'kafka-demo-producer',
      brokers: ['localhost:9092'],
    },
  }
}
```
`DemoProducerController`
```
    @Client(kafkajsProducerConfig)
    kafka: ClientKafka

    @Get()
    getProducerHello(): string {
        console.log('[DemoProducerController] getProducerHello')
        this.send()

        return 'hello producer'
    }

    send() {
        const payload = 'hello from [DemoProducerController] ' + new Date()
        const sent = this.kafka.emit('demo-topic', payload)
        console.log('[DemoProducerController] message is published')
        // sent.subscribe(() => console.log('message has been sent'))
    }
```

```
npm install @nestjs/schedule
npm install @types/cron
```

```
@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
})
```
```
@Cron(CronExpression.EVERY_30_SECONDS)
```

### [NestJS 11 - Interceptor and Decorator](https://www.youtube.com/watch?v=_7EFgsri3Qo)

```
nest g in log
nest g d log
```
