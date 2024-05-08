import express from 'express'
import { createAccount, getAccount } from '../controllers/AccountControllers.js'
import { authUser } from '../middlewares/auth.js'

const accountRoutes = express.Router()

accountRoutes.post('/accounts', authUser, createAccount)

accountRoutes.get('/accounts/:user_id', authUser, getAccount)

export { accountRoutes }
