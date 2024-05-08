import express from 'express'
import {
  createTransactionController,
  getTransactionByIdController,
  updateTransactionController,
  deleteTransactionController,
  listTransactionsByCategoryController,
  listTransactionsByDateRangeController,
} from '../Controllers/Transactions.js'
import { authUser } from '../Middlewares/auth.js'

const transactionRoutes = express.Router()

transactionRoutes.post('/transactions', authUser, createTransactionController)

transactionRoutes.get(
  '/transactions/:id',
  authUser,
  getTransactionByIdController,
)

transactionRoutes.put(
  '/transactions/:id',
  authUser,
  updateTransactionController,
)

transactionRoutes.delete(
  '/transactions/:id',
  authUser,
  deleteTransactionController,
)

transactionRoutes.get(
  '/users/:userId/transactions/category/:category',
  authUser,
  listTransactionsByCategoryController,
)

transactionRoutes.get(
  '/users/:userId/transactions/date',
  authUser,
  listTransactionsByDateRangeController,
)

export { transactionRoutes }
