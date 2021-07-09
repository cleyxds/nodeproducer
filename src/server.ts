import express from 'express'

import { routes } from './routes'

import dotenv from 'dotenv'
dotenv.config()

const SERVER_PORT = process.env.SERVER_PORT

const app = express()

app.use(express.json())
app.use(routes)

app.listen(SERVER_PORT, () => console.log(`Server ready on port ${SERVER_PORT}`))
