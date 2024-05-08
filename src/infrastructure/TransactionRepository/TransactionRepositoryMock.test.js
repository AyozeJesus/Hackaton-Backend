import { describe, it, expect, beforeEach } from 'vitest'
import TransactionRepositoryMock from './TransactionRepositoryMock'

describe('TransactionRepositoryMock', () => {
  let repo

  beforeEach(() => {
    repo = new TransactionRepositoryMock()
  })

  it('creates and retrieves a transaction', async () => {
    const newTransaction = {
      amount: 100,
      category: 'Food',
      transactionDate: '2023-05-08',
    }
    const createdTransaction = await repo.createTransaction(newTransaction)
    expect(createdTransaction.transaction_id).toBeDefined()
    const fetchedTransaction = await repo.getTransactionById(
      createdTransaction.transaction_id,
    )
    expect(fetchedTransaction).toMatchObject(newTransaction)
  })

  it('updates a transaction', async () => {
    const transaction = await repo.createTransaction({
      amount: 50,
      category: 'Utilities',
    })
    const updatedData = { amount: 75, category: 'Utilities Updated' }
    const updatedTransaction = await repo.updateTransaction(
      transaction.transaction_id,
      updatedData,
    )
    expect(updatedTransaction.amount).toBe(75)
    expect(updatedTransaction.category).toBe('Utilities Updated')
  })

  it('deletes a transaction', async () => {
    const transaction = await repo.createTransaction({ amount: 150 })
    await repo.deleteTransaction(transaction.transaction_id)
    await expect(
      repo.getTransactionById(transaction.transaction_id),
    ).rejects.toThrow('Transaction not found')
  })

  it('lists transactions by amount', async () => {
    await repo.createTransaction({ amount: 200 })
    await repo.createTransaction({ amount: 300 })
    const filteredTransactions = await repo.listTransactionsByAmount(250, 350)
    expect(filteredTransactions.length).toBe(1)
    expect(filteredTransactions[0].amount).toBe(300)
  })

  it('calculates the sum of all transactions', async () => {
    await repo.createTransaction({ amount: 100 })
    await repo.createTransaction({ amount: 200 })
    await repo.createTransaction({ amount: 300 })
    const total = await repo.sumOfAllTransactions()
    expect(total).toBe(600)
  })
})
