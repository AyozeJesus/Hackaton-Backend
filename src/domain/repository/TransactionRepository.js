import { getConnection } from '../../infrastructure/Database/MySQLClient.js'
import { generateError } from '../../domain/utils/helpers.js'

export class TransactionRepository {
  async createTransaction(transactionData) {
    let connection
    try {
      connection = await getConnection()
      const insertTransactionQuery = `
        INSERT INTO transactions 
        (cc_num, merchant, category, amount, transaction_num, transaction_date, transaction_time, expense_income)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

      const {
        cc_num,
        merchant,
        category,
        amount,
        transactionNum,
        transactionDate,
        transactionTime,
        expenseIncome,
      } = transactionData

      const [insertResult] = await connection.query(insertTransactionQuery, [
        cc_num,
        merchant,
        category,
        amount,
        transactionNum,
        transactionDate,
        transactionTime,
        expenseIncome,
      ])

      return { transaction_id: insertResult.insertId }
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async getTransactionByTransactionNum(transactionNum) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT * FROM transactions WHERE transaction_num = ?',
        [transactionNum],
      )

      if (rows.length === 0) {
        throw generateError('Transaction not found.', 404)
      }

      return rows[0]
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async getTransactionById(transaction_id) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT * FROM transactions WHERE transaction_id = ?',
        [transaction_id],
      )

      if (rows.length === 0) {
        throw generateError('Transaction not found.', 404)
      }

      return rows[0]
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async updateTransaction(transaction_id, updateData) {
    let connection
    try {
      connection = await getConnection()
      const updateQuery = `
        UPDATE transactions
        SET category = ?, amount = ?, transaction_date = ?, transaction_time = ?, expense_income = ?
        WHERE transaction_id = ?`

      const {
        category,
        amount,
        transactionDate,
        transactionTime,
        expenseIncome,
      } = updateData

      await connection.query(updateQuery, [
        category,
        amount,
        transactionDate,
        transactionTime,
        expenseIncome,
        transaction_id,
      ])
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async deleteTransaction(transaction_id) {
    let connection
    try {
      connection = await getConnection()
      await connection.query(
        'DELETE FROM transactions WHERE transaction_id = ?',
        [transaction_id],
      )
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async listTransactions(transaction_id) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT * FROM transactions WHERE transaction_id = ? ORDER BY transaction_date DESC',
        [transaction_id],
      )
      return rows
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async listTransactionsByCategory(category) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT * FROM transactions WHERE category = ? ORDER BY transaction_date DESC',
        [category],
      )
      return rows
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async listTransactionsByDateRange(transaction_id, startDate, endDate) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT * FROM transactions WHERE transaction_id = ? AND transaction_date BETWEEN ? AND ? ORDER BY transaction_date DESC',
        [transaction_id, startDate, endDate],
      )
      return rows
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }
}
