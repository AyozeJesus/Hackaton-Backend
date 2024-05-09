import { TransactionRepository } from '../repository/TransactionRepository.js'
import { TransactionNotFoundError } from '../errors/TransactionNotFoundError.js'
import { calculateTotalByAccount } from '../utils/calculateTotal.js'

class TransactionService {
  constructor() {
    this.transactionRepository = new TransactionRepository()
  }

  async createTransaction(transactionData) {
    return this.transactionRepository.createTransaction(transactionData)
  }

  async getExpensesByCategoryAndAccount(category, cc_num) {
    return this.transactionRepository.getExpensesByCategoryAndAccount(category, cc_num)
  }

  async getIncomesByCategoryAndAccount(category, cc_num) {
    return this.transactionRepository.getIncomesByCategoryAndAccount(category, cc_num)
  }

  async getTotalExpensesByCategoryAndAccount(category, cc_num) {
    return this.transactionRepository.getTotalExpensesByCategoryAndAccount(category, cc_num)
  }

  async getTotalIncomesByCategoryAndAccount(category, cc_num) {
    return this.transactionRepository.getTotalIncomesByCategoryAndAccount(category, cc_num)
  }

  async getTransactionByTransactionNum(transactionNum) {
    const transaction =
      await this.transactionRepository.getTransactionByTransactionNum(
        transactionNum,
      )
    if (!transaction) {
      throw new TransactionNotFoundError(
        `Transaction with transaction number ${transactionNum} not found.`,
      )
    }
    return transaction
  }

  async getTransactionById(transaction_id) {
    const transaction =
      await this.transactionRepository.getTransactionById(transaction_id)
    if (!transaction) {
      throw new TransactionNotFoundError(
        `Transaction with ID ${transaction_id} not found.`,
      )
    }
    return transaction
  }

  async updateTransaction(transaction_id, updateData) {
    return this.transactionRepository.updateTransaction(
      transaction_id,
      updateData,
    )
  }

  async getExpensesByAccount(cc_num) {
    return this.transactionRepository.getExpensesByAccount(cc_num);
  }

  async getTransactionsByAccount(cc_num) {
    return this.transactionRepository.getTransactionsByAccount(cc_num);
  }

  async getIncomesByAccount(cc_num) {
    return this.transactionRepository.getIncomesByAccount(cc_num);
  }

  async deleteTransaction(transaction_id) {
    return this.transactionRepository.deleteTransaction(transaction_id)
  }

  async listTransactionsBytransaction_id(transaction_id) {
    return this.transactionRepository.listTransactions(transaction_id)
  }

  async listTransactionsByCategory(category) {
    return this.transactionRepository.listTransactionsByCategory(
      category,
    )
  }

  async listTransactionsByDateRangeAndAccount(startDate, endDate, cc_num) {
    return this.transactionRepository.listTransactionsByDateRangeAndAccount(
      startDate,
      endDate,
      cc_num,
    )
  }
  async getTotalExpensesByAccount(cc_num) {
    return calculateTotalByAccount('expenses', cc_num);
  }

  async getTotalIncomesByAccount(cc_num) {
    return calculateTotalByAccount('incomes', cc_num);
  }
}

export default TransactionService
