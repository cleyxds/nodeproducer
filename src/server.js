import express from 'express';
import { Kafka, logLevel } from 'kafkajs';
import routes from './routes.js';

const SERVER_PORT = process.env.SERVER_PORT || 3333;
const KAFKA_BROKERS = process.env.KAFKA_BROKERS || 'localhost:9092';

export const POWER_TOPIC = 'POWER_SENSORS';

const app = express();

export const kafka = new Kafka({
  clientId: 'ELECKTRA-PRODUCER',
  brokers: [KAFKA_BROKERS],
  logLevel: logLevel.NOTHING,
});
 
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'POWER-GROUP-RECEIVER' });

app.use((req, res, next) => {
  req.producer = producer;

  return next();
});

app.use(express.json());
app.use(routes);

kafka_api(false).catch(console.error);

async function kafka_api(debug) {
  await producer.connect().catch(reason => console.log(`Error on connect producer, reason => ${reason}`));
  
  if (debug) {
    await consumer.connect();

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
