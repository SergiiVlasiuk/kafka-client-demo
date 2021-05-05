const { Kafka } = require('kafkajs')

// export default kafka = new Kafka({
// export default new Kafka({
const kafka = new Kafka({
  // clientId: 'test-client-id',
  // brokers: ['localhost:9092']
  // brokers: ['kafka1:9092']
  brokers: ['kafka1:19092']
})

module.exports = kafka
