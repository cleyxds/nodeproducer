import express from 'express';
import { Kafka, logLevel } from 'kafkajs';
import routes from './routes';

const SERVER_PORT = 3333
export const POWER_TOPIC = 'POWER_SENSORS';

const app = express();

export const kafka = new Kafka({
  clientId: 'ELECKTRA-PRODUCER',
  brokers: ['localhost:9092'],
  logLevel: logLevel.NOTHING,
  retry: {
    initialRetryTime: 300,
    retries: 10
  },
});
 
const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'POWER-GROUP-RECEIVER' })

app.use((req, res, next) => {
  req.producer = producer;

  return next();
});

app.use(express.json());
app.use(routes);

kafka_api(false).catch(console.error)

async function kafka_api(debug) {
  await producer.connect()
  
  if (debug) {
    await consumer.connect()

    await consumer.subscribe({ topic: POWER_TOPIC });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const measurement = JSON.parse(String(message.value));
        console.log(measurement);
      },
    });
  }

  app.listen(SERVER_PORT, () => {console.log(`Server ready on port ${SERVER_PORT}`)});
}
