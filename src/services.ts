import express, { Request, Response } from 'express'
import { createServer } from 'http'

import { Server as SocketServer } from 'socket.io'

import { ICustomer } from './types/customer'
import { IMeasurement } from './types/measurement'

const SOCKET_IO_PORT = 33334
const PRODUCER_PORT = 3333

const APP_TRANSMITTER = express()
const APP_PRODUCER = express()

const SERVER_TRANSMITTER = createServer(APP_TRANSMITTER)

APP_PRODUCER.use(express.json())

export const io = new SocketServer(SERVER_TRANSMITTER, {
  cors: {
    origin: `*`,
    methods: ['GET', 'POST']
  }
})

io.on('connection', async socket => {
  socket.on('customer', (customer: ICustomer) => {

    /* 

      SÓ COMEÇA A FAZER O STREAMING DEPOIS QUE O CUSTOMER EMITE SEUS DADOS.
      QUANDO TIVER OS DADOS DO CUSTOMER OS PRÓXIMOS REQUESTS QUE OS SENSORES FIZEREM SERÃO STREAMADOS

    */

    APP_PRODUCER.post('/power/data/:id', (req: Request, res: Response) => {
      const { id } = req.params
      const { measurement, device_id } = req.body
  
      const customer_id = parseInt(id)
  
      const Measurement: IMeasurement = {
        customer_id,
        device_id,
        measurement,
        timestamp: new Date()
      }
  
      customer.id == Measurement.customer_id && io.emit('measurement', Measurement)
  
      return res.status(201).send()
    })

    /*
      APP_PRODUCER.get('/power/data', (req: Request, res: Response) => {
        customer.id == data.customer_id ? (res.json(data)) : (res.status(403).send())
      })
    */
    
  })

  console.log(`New client connected ${socket.id}`)

  socket.on('disconnect', reason => {
    console.log(`Client disconnected ${socket.id} for ${reason}`)
  })
})

APP_PRODUCER.listen(PRODUCER_PORT, () => console.log(`Producer ready on port ${PRODUCER_PORT}`))
SERVER_TRANSMITTER.listen(SOCKET_IO_PORT, () => console.log(`Socket.io ready on port ${SOCKET_IO_PORT}`))
