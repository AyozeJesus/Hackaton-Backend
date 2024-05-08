import TransactionRepositoryMock from './TransactionRepositoryMock'
import { describe, beforeEach, it, expect } from 'vitest'

describe('TransactionRepositoryMock', () => {
  let repo
  let initialTransaction

  beforeEach(() => {
    repo = new TransactionRepositoryMock()
    initialTransaction = {
      userId: 1,
      merchantId: 100,
      category: 'Electronics',
      amount: 199.99,
      transactionNum: 'TX123456789',
      unixTime: 1622549761,
      transactionDate: new Date('2021-06-01'),
      transactionTime: '15:30:00',
      expenseIncome: true,
    }
    repo.createTransaction(initialTransaction)
  })

  it('should create a transaction and retrieve it', async () => {
    const newTransaction = {
      userId: 2,
      merchantId: 101,
      category: 'Groceries',
      amount: 35.5,
      transactionNum: 'TX987654321',
      unixTime: 1622553361,
      transactionDate: new Date('2021-06-01'),
      transactionTime: '16:30:00',
      expenseIncome: false,
    }
    const createdTransaction = await repo.createTransaction(newTransaction)
    expect(createdTransaction).toEqual({ id: 2, ...newTransaction })

    const fetchedTransaction = await repo.getTransactionById(2)
    expect(fetchedTransaction).toEqual({ id: 2, ...newTransaction })
  })

  it('should update a transaction', async () => {
    const updates = { amount: 250.75 }
    const updatedTransaction = await repo.updateTransaction(1, updates)
    expect(updatedTransaction.amount).toEqual(250.75)
  })

  it('should delete a transaction', async () => {
    await repo.deleteTransaction(1)
    await expect(repo.getTransactionById(1)).rejects.toThrow(
      'Transaction not found',
    )
  })

  it('should list all transactions for a specific user', async () => {
    const transactions = await repo.listTransactions(1)
    expect(transactions).toEqual([
      {
        id: 1,
        ...initialTransaction,
      },
    ])
  })

  it('should list transactions by category', async () => {
    const categoryTransactions = await repo.listTransactionsByCategory(
      1,
      'Electronics',
    )
    expect(categoryTransactions).toEqual([
      {
        id: 1,
        ...initialTransaction,
      },
    ])
  })

  it('should list transactions by date range', async () => {
    const dateRangeTransactions = await repo.listTransactionsByDateRange(
      1,
      new Date('2021-06-01'),
      new Date('2021-06-02'),
    )
    expect(dateRangeTransactions).toEqual([
      {
        id: 1,
        ...initialTransaction,
      },
    ])
  })

  it('should handle non-existent transaction when updating', async () => {
    await expect(repo.updateTransaction(999, { amount: 300 })).rejects.toThrow(
      'Transaction not found',
    )
  })

  it('should handle non-existent transaction when deleting', async () => {
    await expect(repo.deleteTransaction(999)).rejects.toThrow(
      'Transaction not found',
    )
  })
})
