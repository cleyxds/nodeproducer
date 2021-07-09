import express from 'express'

import { create, last } from './controllers/PowerController'

export const routes = express.Router()

routes.post('/power/data/:id', create)
routes.get('/power/data', last)
