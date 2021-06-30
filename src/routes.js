import express from 'express';
import { CompressionTypes } from 'kafkajs';

const routes = express.Router();

let data = {}

routes.post('/data/power/:id', async (req, res) => {
  const { id } = req.params;
  const { measurement } = req.body;

  const customer_id = parseInt(id);

  const Measurement = {
    customer_id,
    measurement,
    timestamp: new Date()
  }

  data = Measurement

  // Chamar micro serviço
  await req.producer.send({
    topic: 'POWER_SENSORS',
    compression: CompressionTypes.GZIP,
    messages: [
      { value: JSON.stringify(Measurement) }
    ],
  })

  return res.status(201).send();
});

routes.get('/data/power/:id', async (req, res) => {
  return res.json(data)
});

export default routes;