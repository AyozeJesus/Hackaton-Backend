import TransactionService from '../../../domain/services/TransactionService.js'
import {
  transactionsSchema,
  updateTransactionSchema,
} from '../schemas/transactionSchemas.js'
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

export const getTransactionsByAccountController = async (req, res, next) => {
  try {
    const cc_num = req.params.cc_num;
    const transactions = await transactionService.getTransactionsByAccount(cc_num);
    res.status(200).json(transactions);
  } catch (err) {
    next(err);
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
    const { category } = req.params
    const transactions = await transactionService.listTransactionsByCategory(
      category,
    )
    res.status(200).json(transactions)
  } catch (err) {
    next(err)
  }
}

export const getExpensesByAccountController = async (req, res, next) => {
  try {
    const cc_num = req.params.cc_num;
    const expenses = await transactionService.getExpensesByAccount(cc_num);
    res.status(200).json(expenses);
  } catch (err) {
    next(err);
  }
};

export const getIncomesByAccountController = async (req, res, next) => {
  try {
    const cc_num = req.params.cc_num;
    const incomes = await transactionService.getIncomesByAccount(cc_num);
    res.status(200).json(incomes);
  } catch (err) {
    next(err);
  }
};

export const getTotalExpensesByAccountController = async (req, res, next) => {
  try {
    const cc_num = req.params.cc_num;
    const totalExpenses = await transactionService.getTotalExpensesByAccount(cc_num);
    res.json({ totalExpenses });
  } catch (error) {
    next(error);
  }
};

export const getAllIncomesByCategoryAndAccountController = async (req, res, next) => {
  try {
    const { category, cc_num } = req.params
    const incomes = await transactionService.getIncomesByCategoryAndAccount(
      category,
      cc_num,
    )
    res.status(200).json(incomes)
  } catch (err) {
    next(err)
  }
}

export const getAllExpensesByCategoryAndAccountController = async (req, res, next) => {
  try {
    const { category, cc_num } = req.params
    const expenses = await transactionService.getExpensesByCategoryAndAccount(
      category,
      cc_num,
    )
    res.status(200).json(expenses)
  } catch (err) {
    next(err)
  }
}

export const getExpensesByCategoryController = async (req, res, next) => {
  try {
    const category = req.params.category;
    const expenses = await transactionService.getExpensesByCategory(category);
    res.status(200).json(expenses);
  } catch (err) {
    next(err);
  }
}

export const getIncomesByCategoryAndAccountController = async (req, res, next) => {
  try {
    const { category, cc_num } = req.params
    const incomes = await transactionService.getIncomesByCategoryAndAccount(
      category,
      cc_num,
    )
    res.status(200).json(incomes)
  } catch (err) {
    next(err)
  }
}

export const getExpensesByCategoryAndAccountController = async (req, res, next) => {
  try {
    const { category, cc_num } = req.params
    const expenses = await transactionService.getExpensesByCategoryAndAccount(
      category,
      cc_num,
    )
    res.status(200).json(expenses)
  } catch (err) {
    next(err)
  }
}

export const getTotalIncomesByAccountController = async (req, res, next) => {
  try {
    const cc_num = req.params.cc_num;
    const totalIncomes = await transactionService.getTotalIncomesByAccount(cc_num);
    res.json({ totalIncomes });
  } catch (error) {
    next(error);
  }
};

export const listTransactionsByDateRangeAndAccountController = async (req, res, next) => {
  try {
    const { startDate, endDate, cc_num } = req.query
    const transactions = await transactionService.listTransactionsByDateRangeAndAccount(
      startDate,
      endDate,
      cc_num,
    )
    res.status(200).json(transactions)
  } catch (err) {
    next(err)
  }
}
