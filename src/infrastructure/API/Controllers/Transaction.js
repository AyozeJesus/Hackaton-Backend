import { TransactionService } from '../../../domain/services/TransactionService.js'
import {
  transactionsSchema,
  updateTransactionSchema,
} from '../schemas/transactionsSchemas.js'
import { generateError } from '../../../domain/utils/helpers.js'

const transactionService = new TransactionService()

export const createTransactionController = async (req, res, next) => {
  try {
    const { error } = transactionsSchema.validate(req.body)

    if (error) {
      throw generateError(error.details[0].message, 400)
    }

    const transaction = await transactionService.createTransaction(req.body)
    res
      .status(201)
      .json({ message: 'Transaction created successfully', transaction })
  } catch (err) {
    next(err)
  }
}

export const getTransactionByIdController = async (req, res, next) => {
  try {
    const transaction = await transactionService.getTransactionById(
      req.params.id,
    )
    res.status(200).json(transaction)
  } catch (err) {
    next(err)
  }
}

export const updateTransactionController = async (req, res, next) => {
  try {
    const { error } = updateTransactionSchema.validate(req.body)

    if (error) {
      throw generateError(error.details[0].message, 400)
    }

    await transactionService.updateTransaction(req.params.id, req.body)
    res.status(200).json({ message: 'Transaction updated successfully' })
  } catch (err) {
    next(err)
  }
}

export const deleteTransactionController = async (req, res, next) => {
  try {
    await transactionService.deleteTransaction(req.params.id)
    res.status(200).json({ message: 'Transaction deleted successfully' })
  } catch (err) {
    next(err)
  }
}

export const listTransactionsByCategoryController = async (req, res, next) => {
  try {
    const { transaction_id, category } = req.params
    const transactions = await transactionService.listTransactionsByCategory(
      transaction_id,
      category,
    )
    res.status(200).json(transactions)
  } catch (err) {
    next(err)
  }
}

export const listTransactionsByDateRangeController = async (req, res, next) => {
  try {
    const { transaction_id } = req.params
    const { startDate, endDate } = req.query
    const transactions = await transactionService.listTransactionsByDateRange(
      transaction_id,
      startDate,
      endDate,
    )
    res.status(200).json(transactions)
  } catch (err) {
    next(err)
  }
}
