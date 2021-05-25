**[ <= back](../README.md#Nest.js+microservice+approaches)**
# Nest.js Microservices

## [Install the required package](https://docs.nestjs.com/microservices/basics#installation)
```
npm i --save @nestjs/microservices
```

## Few approaches to instantiate a microservice
### 1. Update `main.ts` using `createMicroservice`:
```
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    microserviceConfig,
  );
  app.listen(() => console.log('Microservice is listening'))
  ```
### 2. Update `main.ts` using `connectMicroservice`:
```
async function bootstrap() {
  const port = 3000
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice(microserviceConfig)
  await app.startAllMicroservicesAsync()

  await app.listen(port, () => console.log(`Service has been started on port ${port} listening microservice`))
}
```
## [Few approaches to instantiate a microservice client](https://docs.nestjs.com/microservices/basics#client):
### 1. Tocken injection:
```
@Module({
  imports: [
    ClientsModule.register([
      { name: 'USEFUL_TOKEN_NAME_FOR_YOUR_SERVICE', transport: Transport.TCP },
    ]),
  ]
  // ...
})
```
to use client in app you can inject one via constructor:
```
constructor(
  @Inject('USEFUL_TOKEN_NAME_FOR_YOUR_SERVICE') private client: ClientProxy,
) {}
```
### 2. Using client decorator for property:
```
@Client(clientConfig)
client: ClientProxy
```
## Colloboration understanding
### [Request - responce](https://docs.nestjs.com/microservices/basics#asynchronous-responses)
```
@MessagePattern({ cmd: 'sum' })
async accumulate(data: number[]): Promise<number> {
  return (data || []).reduce((a, b) => a + b);
}
```
```
@MessagePattern({ cmd: 'sum' })
accumulate(data: number[]): Observable<number> {
  return from([1, 2, 3]);
}
```
P.S.
It requires `..._.reply` topic.
To keep conversation in this way client code example:
```
    const sent: Observable<any> = this.kafka.send('demo-topic', payload)
    const sent = this.client.emit({ cmd: 'sum' }, payload)
    sent.subscribe(answer => console.log('message has been sent and received answer: ', answer))
```
P.S.2.
2-way messaging requirements:
 - `@MessagePattern` handler should be initialised before producer (other way leads to exceptions)
 - using method `send` doesn't send any payload. It just prepares instructions to execute. Execution triggered by terminal operation like `.subscribe(..)`
### [One way message](https://docs.nestjs.com/microservices/basics#event-based)
```
@EventPattern('user_created')
async handleUserCreated(data: Record<string, unknown>) {
  // business logic
}
```
P.S.
To publish message without answer client provides `emit` method (similar to `send` but subscription is not required).
```
    const sent: Observable<any> = this.kafka.emit('demo-topic', payload)
```

# Specific area details:
## [Kafka microservice configuration](kafka_microservice.md)
## TODO - others