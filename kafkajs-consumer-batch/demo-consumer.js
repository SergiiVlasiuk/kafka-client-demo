const kafka = require('./kafkajs-config')

const consumer = kafka.consumer({
  maxBytesPerPartition: 1024,
  // eachBatchAutoResolve: true,
  heartbeatInterval: 3000,
  groupId: 'kafkajs',
  maxWaitTimeInMs: 10000,
  allowAutoTopicCreation: true,
})

const main = async () => {
  await consumer.connect()
  await consumer.subscribe({
    topic: 'demo-topic',
    // fromBeginning: true,
  })

  await consumer.run({
    autoCommit: true,
    eachBatchAutoResolve: false,
    autoCommitThreshold: 5,
    autoCommitInterval: 60000,
    // eachBatch: async (data) => {
    //   await new Promise(resolve => setTimeout(resolve, 1000));
    // }
    eachBatch: async (data) => {
      // console.log('Received data.batch.messages: ', data.batch.messages)
      // setTimeout(() => console.log('time outed [2 sec]'), 2000)
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log('Received data.batch.highWatermark: ', data.batch.highWatermark)
      console.log('Received data.batch.offsetLagLow():', data.batch.offsetLagLow())
      console.log('Received data.batch.offsetLag():', data.batch.offsetLag())
      console.log('Received data.batch.messages.size:', data.batch.messages.length)
    },
    // eachBatch: async ({
    //     batch,
    //     resolveOffset,
    //     heartbeat,
    //     commitOffsetsIfNecessary,
    //     uncommittedOffsets,
    //     isRunning,
    //     isStale,
    // }) => {
    //     for (let message of batch.messages) {
    //         console.log('each batch: ', {
    //             topic: batch.topic,
    //             partition: batch.partition,
    //             highWatermark: batch.highWatermark,
    //             message: {
    //                 offset: message.offset,
    //                 key: message.key.toString(),
    //                 value: message.value.toString(),
    //                 headers: message.headers,
    //             }
    //         })


    //         // // exit
    //         // resolveOffset(message.offset)
    //         // await heartbeat()
    //     }
    // },
    // eachMessage: async ({ topic, partition, message }) => {
    //   console.log('Received message', {
    //     topic,
    //     partition,
    //     key: message.key.toString(),
    //     value: message.value.toString(),
    //     headers: message.headers,
    //   })
    // }
    // eachMessage: async (message) => {
    //   console.log('Received message', message)
    // },
  })
}

main().catch(error => {
  console.log('Error!: ', error)
  for (let message of batch.messages) {
    // console.log('each batch: ', {
    //     topic: batch.topic,
    //     partition: batch.partition,
    //     highWatermark: batch.highWatermark,
    //     message: {
    //         offset: message.offset,
    //         key: message.key.toString(),
    //         value: message.value.toString(),
    //         headers: message.headers,
    //     }
    // })

    // // exit
    // resolveOffset(message.offset)
    // await heartbeat()
}
})
