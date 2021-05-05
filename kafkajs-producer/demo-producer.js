const kafka = require('./kafkajs-config')

const producer = kafka.producer()

const main = async () => {
  await producer.connect()
  const results = await producer.send({
    topic: 'demo-topic',
    messages: [
      { value: 'hello!' },
      { value: 'other message' },
      { value: 'more messages' }
    ]
  })
  console.log('published messages: ', results)
}

main().catch(error => {
  console.log('Error!: ', error)
})
