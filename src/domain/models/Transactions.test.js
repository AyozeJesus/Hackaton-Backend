import { describe, expect, it } from 'vitest'
import { Transaction } from './Transactions'

describe('Transaction class', () => {
  it('should create a transaction instance with valid parameters', () => {
    const transaction = Transaction.create({
      userId: 1,
      merchantId: 101,
      category: 'Groceries',
      amount: 150.25,
      transactionNum: 123456,
      unixTime: 1633036800,
      transactionDate: '2021-10-01',
      transactionTime: '14:00:00',
      expenseIncome: false,
    })

    expect(transaction).toBeInstanceOf(Transaction)
    expect(transaction.getUserId()).toBe(1)
    expect(transaction.getMerchantId()).toBe(101)
    expect(transaction.getCategory()).toBe('Groceries')
    expect(transaction.getAmount()).toBe(150.25)
    expect(transaction.getTransactionNumber()).toBe(123456)
    expect(transaction.getUnixTime()).toBe(1633036800)
    expect(transaction.getTransactionDate()).toBe('2021-10-01')
    expect(transaction.getTransactionTime()).toBe('14:00:00')
    expect(transaction.isIncome()).toBe(false)
  })
})

it('should update transaction details correctly', () => {
  const transaction = new Transaction(
    2,
    102,
    'Utilities',
    200,
    654321,
    1633123200,
    '2021-10-02',
    '15:00:00',
    true,
  )

  transaction.update({
    category: 'Updated Category',
    amount: 250.75,
    transactionDate: '2021-10-03',
    transactionTime: '16:00:00',
    expenseIncome: false,
  })

  expect(transaction.getCategory()).toBe('Updated Category')
  expect(transaction.getAmount()).toBe(250.75)
  expect(transaction.getTransactionDate()).toBe('2021-10-03')
  expect(transaction.getTransactionTime()).toBe('16:00:00')
  expect(transaction.isIncome()).toBe(false)
})

it('should return a correct description of the transaction', () => {
  const transaction = new Transaction(
    3,
    103,
    'Entertainment',
    75,
    789012,
    1633209600,
    '2021-10-03',
    '17:00:00',
    true,
  )

  const description = transaction.describeTransaction()
  expect(description).toBe(
    'Transaction 789012: Income of $75 in category Entertainment on 2021-10-03',
  )
})
