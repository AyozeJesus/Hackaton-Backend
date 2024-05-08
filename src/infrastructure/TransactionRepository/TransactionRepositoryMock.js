import { TransactionRepository } from '../../domain/repository/TransactionRepository.js'

class TransactionRepositoryMock extends TransactionRepository {
  constructor() {
    super()
    this.transactions = []
  }

  async createTransaction(transaction) {
    transaction.id = this.transactions.length + 1 // Mock an auto-increment ID
    this.transactions.push(transaction)
    return transaction
  }

  async getTransactionById(transactionId) {
    const transaction = this.transactions.find((t) => t.id === transactionId)
    if (!transaction) {
      throw new Error('Transaction not found')
    }
    return transaction
  }

  async updateTransaction(transactionId, updateData) {
    const transactionIndex = this.transactions.findIndex(
      (t) => t.id === transactionId,
    )
    if (transactionIndex === -1) {
      throw new Error('Transaction not found')
    }
    this.transactions[transactionIndex] = {
      ...this.transactions[transactionIndex],
      ...updateData,
    }
    return this.transactions[transactionIndex]
  }

  async deleteTransaction(transactionId) {
    const index = this.transactions.findIndex((t) => t.id === transactionId)
    if (index === -1) {
      throw new Error('Transaction not found')
    }
    this.transactions.splice(index, 1)
  }

  async listTransactions(userId) {
    return this.transactions.filter((t) => t.userId === userId)
  }

  async listTransactionsByCategory(userId, category) {
    return this.transactions.filter(
      (t) => t.userId === userId && t.category === category,
    )
  }

  async listTransactionsByDateRange(userId, startDate, endDate) {
    return this.transactions.filter(
      (t) =>
        t.userId === userId &&
        new Date(t.transactionDate) >= new Date(startDate) &&
        new Date(t.transactionDate) <= new Date(endDate),
    )
  }
}

export default TransactionRepositoryMock
