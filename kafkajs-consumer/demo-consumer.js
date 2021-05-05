const kafka = require('./kafkajs-config')

const consumer = kafka.consumer({
  groupId: 'kafkajs'
})

const main = async () => {
  await consumer.connect()
  await consumer.subscribe({
    topic: 'demo-topic',
    fromBeginning: true
  })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Received message', {
        topic,
        partition,
        value: message.value.toString()
      })
    }
  })
}

main().catch(error => {
  console.log('Error!: ', error)
})
