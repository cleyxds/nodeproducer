import { Kafka, logLevel } from 'kafkajs'

const KAFKA_BROKERS = process.env.KAFKA_BROKERS

export const kafka = new Kafka({
  brokers: [KAFKA_BROKERS],
  logLevel: logLevel.NOTHING,
  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_CLIENT_ID,
    password: process.env.KAFKA_CLIENT_SECRET
  },
  ssl: true
})

export const producer = kafka.producer()

const initializeProducer = async () => {
  await producer.connect()
    .then(() => console.log(`Producer connected`))
    .catch(reason => 
      console.log(`Error on connect producer, reason => ${reason}\n@${new Date()}`))
}

initializeProducer().catch(error => console.log(`Producer not connected, cause => ${error}`))
