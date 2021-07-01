import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { kafka, POWER_TOPIC } from './server';

const SOCKET_IO_PORT = 33334

const app = express();

const httpServer = createServer(app);
const io = new SocketServer(httpServer);

export const socket = io.on('connection', async socket => {
  const consumer = kafka.consumer({ groupId: 'POWER-GROUP-RECEIVER' });

    await consumer.connect();
    await consumer.subscribe({ topic: POWER_TOPIC })
    await consumer.run({
      eachMessage: async (topic, partition, message) => {
        console.log(String(message.value));
        const measurement = JSON.parse(String(message.value));
        
        socket.emit('measurement', measurement);
        socket.broadcast.emit('measurement', measurement);
      },
    });
  });

export const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

httpServer.listen(SOCKET_IO_PORT, () => {console.log(`Socket.io ready on port ${SOCKET_IO_PORT}`)});
