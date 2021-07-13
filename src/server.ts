import express from 'express'

import { routes } from './routes'

const SERVER_PORT = 3333

const app = express()

app.use(express.json())
app.use(routes)

app.listen(SERVER_PORT, () => console.log(`Server ready on port ${SERVER_PORT}`))
