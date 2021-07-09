import { Request, Response } from 'express'

import { CompressionTypes } from 'kafkajs'

import { producer } from '../kafka/producer'

const POWER_TOPIC = 'POWER_SENSORS'

interface Measurement {
  customer: number
  measurement: number
  timestamp: Date
}

let data = {}

export const create = async (req: Request, res: Response) => {
  const { id } = req.params
  const { measurement } = req.body

  const customer = parseInt(id)

  const Measurement: Measurement = {
    customer,
    measurement,
    timestamp: new Date()
  }

  data = Measurement

  await producer.send({
    topic: POWER_TOPIC,
    compression: CompressionTypes.GZIP,
    messages: [
      { value: JSON.stringify(Measurement) }
    ],
  })
    .catch(reason => {
      console.log(`Error on send message, reason => ${reason}\n@${new Date()}`)
      
      return res.status(503).json({error: 'The producer is disconnected'})
    })

  return res.status(201).send()
}

export const last = (req: Request, res: Response) => {
  return res.json(data)
}
