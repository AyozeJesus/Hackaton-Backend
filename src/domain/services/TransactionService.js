import { TransactionRepository } from '../repository/TransactionRepository.js'
import { TransactionNotFoundError } from '../errors/TransactionNotFoundError.js'

class TransactionService {
  constructor() {
    this.transactionRepository = new TransactionRepository()
  }

  async createTransaction(transactionData) {
    return this.transactionRepository.createTransaction(transactionData)
  }

  async getTransactionById(transactionId) {
    const transaction =
      await this.transactionRepository.getTransactionById(transactionId)
    if (!transaction) {
      throw new TransactionNotFoundError(
        `Transaction with ID ${transactionId} not found.`,
      )
    }
    return transaction
  }

  async updateTransaction(transactionId, updateData) {
    return this.transactionRepository.updateTransaction(
      transactionId,
      updateData,
    )
  }

  async deleteTransaction(transactionId) {
    return this.transactionRepository.deleteTransaction(transactionId)
  }

  async listTransactionsByUserId(userId) {
    return this.transactionRepository.listTransactions(userId)
  }

  async listTransactionsByCategory(userId, category) {
    return this.transactionRepository.listTransactionsByCategory(
      userId,
      category,
    )
  }

  async listTransactionsByDateRange(userId, startDate, endDate) {
    return this.transactionRepository.listTransactionsByDateRange(
      userId,
      startDate,
      endDate,
    )
  }
}

export default TransactionService
