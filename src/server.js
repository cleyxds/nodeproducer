import express from 'express';
import { Kafka, logLevel } from 'kafkajs';

import routes from './routes';

const app = express();

/**
 * Faz conexão com o Kafka
 */
const kafka = new Kafka({
  clientId: 'elecktra',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10
  },
});
 
const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'POWER-GROUP-RECEIVER' })

/**
 * Disponibiliza o producer para todas rotas
 */
app.use((req, res, next) => {
  req.producer = producer;

  return next();
});

app.use((req, res, next) => {
  res.consumer = consumer;

  return next();
})

/**
 * Cadastra as rotas da aplicação
 */
app.use(express.json());
app.use(routes);

async function run() {
  await producer.connect()
  await consumer.connect()

  await consumer.subscribe({ topic: 'POWER_SENSORS' });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Resposta: ', String(message.value));
    },
  });

  app.listen(3333, () => {console.log("Server running on port 3333")});
}

run().catch(console.error)

