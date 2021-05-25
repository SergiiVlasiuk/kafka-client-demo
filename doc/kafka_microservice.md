**[ <= back](nest.js_microservice.md#Kafka+microservice+configuration)**

## Kafka Consumer Configuration for NEST.JS Microservice

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
    }
}
```

`kafkajsMicroserviceConfig` should be used in [`main.ts`](nest.js_microservice.md#Few+approaches+to+instantiate+a+microservice)

Also to be able listen something on specified configuration it needs to subscribe on topics and connect to microservice. The best way of doing this is to use lifecycle hooks like `OnModuleInit`, `OnModuleDestroy`:
```
    async onModuleInit() {
        this.client.subscribeToResponseOf('demo-topic')
        await this.client.connect()
    }
```
`onModuleInit` should be `async` if in `main.ts` you've used `await app.startAllMicroservicesAsync()`. `async` should be removed if in `main.ts` was used `app.startAllMicroservices()`
```
    onModuleDestroy() {
        this.client.close()
    }
```
It will activate functionality decorated by `@MessagePattern` or `@EventPattern`

## Kafka Producer Configuration for NEST.JS Microservice

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
Client examples
 - property injection
```
    @Client(kafkajsProducerConfig)
    kafka: ClientKafka
```
 - usage
```
    const sent: Observable<any> = this.kafka.emit('demo-topic', payload)
```
or
```
    const sent: Observable<any> = this.kafka.send({ cmd: 'sum' }, payload)
    sent.subscribe(answer => console.log('message has been sent and answered: ', answer))
```
