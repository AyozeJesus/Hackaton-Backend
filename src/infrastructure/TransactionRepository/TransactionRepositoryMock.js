import { TransactionRepository } from '../../domain/repository/TransactionRepository.js'

class TransactionRepositoryMock extends TransactionRepository {
  constructor() {
    super()
    this.transactions = []
  }

  async createTransaction(transaction) {
    transaction.transaction_id = this.transactions.length + 1
    this.transactions.push(transaction)
    return transaction
  }

  async getTransactionById(transaction_id) {
    const transaction = this.transactions.find(
      (t) => t.transaction_id === transaction_id,
    )
    if (!transaction) {
      throw new Error('Transaction not found')
    }
    return transaction
  }

  async updateTransaction(transaction_id, updateData) {
    const transactionIndex = this.transactions.findIndex(
      (t) => t.transaction_id === transaction_id,
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

  async deleteTransaction(transaction_id) {
    const index = this.transactions.findIndex(
      (t) => t.transaction_id === transaction_id,
    )
    if (index === -1) {
      throw new Error('Transaction not found')
    }
    this.transactions.splice(index, 1)
  }

  async listTransactionsByAmount(minAmount, maxAmount) {
    return this.transactions.filter(
      (t) => t.amount >= minAmount && t.amount <= maxAmount,
    )
  }

  async sumOfAllTransactions() {
    return this.transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    )
  }
}

export default TransactionRepositoryMock
