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
