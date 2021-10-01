import { Kafka, logLevel } from 'kafkajs'

import dotenv from 'dotenv'
dotenv.config()

const KAFKA_BROKERS = process.env.KAFKA_BROKERS

export const kafka = new Kafka({
  brokers: [KAFKA_BROKERS],
  retry: {
    factor: .2,
    retries: 5,
    multiplier: 2
  },
  logLevel: logLevel.NOTHING
})

export const producer = kafka.producer()

const initializeProducer = async () => {
  await producer.connect()
    .then(() => console.log(`Producer connected`))
    .catch(reason => 
      console.log(`Error on connect producer, reason => ${reason}\n@${new Date()}`))
}

initializeProducer().catch(error => console.log(`Producer not connected, cause => ${error}`))
