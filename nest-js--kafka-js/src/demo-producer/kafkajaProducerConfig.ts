import { KafkaOptions, Transport } from "@nestjs/microservices";

export const kafkajsProducerConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'kafka-demo-producer',
      brokers: ['localhost:9092'],
    },
    // consumer: {
    //   groupId: 'demo-group',
    // }
    //   subscribe: {
    //     topic: '/topic-(eu|us)-./i',
    //       fromBeginning: true
    //   }
  }
}
