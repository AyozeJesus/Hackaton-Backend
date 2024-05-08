import { TransactionRepository } from '../repository/TransactionRepository.js'
import { TransactionNotFoundError } from '../errors/TransactionNotFoundError.js'

class TransactionService {
  constructor() {
    this.transactionRepository = new TransactionRepository()
  }

  async createTransaction(transactionData) {
    return this.transactionRepository.createTransaction(transactionData)
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

  async deleteTransaction(transaction_id) {
    return this.transactionRepository.deleteTransaction(transaction_id)
  }

  async listTransactionsBytransaction_id(transaction_id) {
    return this.transactionRepository.listTransactions(transaction_id)
  }

  async listTransactionsByCategory(transaction_id, category) {
    return this.transactionRepository.listTransactionsByCategory(
      transaction_id,
      category,
    )
  }

  async listTransactionsByDateRange(transaction_id, startDate, endDate) {
    return this.transactionRepository.listTransactionsByDateRange(
      transaction_id,
      startDate,
      endDate,
    )
  }
}

export default TransactionService
