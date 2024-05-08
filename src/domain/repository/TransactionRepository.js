import { getConnection } from '../../infrastructure/Database/MySQLClient.js'
import { generateError } from '../../domain/utils/helpers.js'

export class TransactionRepository {
  async createTransaction(transactionData) {
    let connection
    try {
      connection = await getConnection()
      const insertTransactionQuery = `
        INSERT INTO transactions 
        (user_id, merchant_id, category, amount, transaction_num, unix_time, transaction_date, transaction_time, expense_income)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

      const {
        userId,
        merchantId,
        category,
        amount,
        transactionNum,
        unixTime,
        transactionDate,
        transactionTime,
        expenseIncome,
      } = transactionData

      const [insertResult] = await connection.query(insertTransactionQuery, [
        userId,
        merchantId,
        category,
        amount,
        transactionNum,
        unixTime,
        transactionDate,
        transactionTime,
        expenseIncome,
      ])

      return { transactionId: insertResult.insertId }
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async getTransactionById(transactionId) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT * FROM transactions WHERE transaction_num = ?',
        [transactionId],
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

  async updateTransaction(transactionId, updateData) {
    let connection
    try {
      connection = await getConnection()
      const updateQuery = `
        UPDATE transactions
        SET category = ?, amount = ?, transaction_date = ?, transaction_time = ?, expense_income = ?
        WHERE transaction_num = ?`

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
        transactionId,
      ])
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async deleteTransaction(transactionId) {
    let connection
    try {
      connection = await getConnection()
      await connection.query(
        'DELETE FROM transactions WHERE transaction_num = ?',
        [transactionId],
      )
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async listTransactions(userId) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT * FROM transactions WHERE user_id = ? ORDER BY transaction_date DESC',
        [userId],
      )
      return rows
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async listTransactionsByCategory(userId, category) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT * FROM transactions WHERE user_id = ? AND category = ? ORDER BY transaction_date DESC',
        [userId, category],
      )
      return rows
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async listTransactionsByDateRange(userId, startDate, endDate) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT * FROM transactions WHERE user_id = ? AND transaction_date BETWEEN ? AND ? ORDER BY transaction_date DESC',
        [userId, startDate, endDate],
      )
      return rows
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }
}
