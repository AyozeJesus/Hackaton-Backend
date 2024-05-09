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
        date,
        time,
        expense_income,
      } = transactionData

      const [insertResult] = await connection.query(insertTransactionQuery, [
        cc_num,
        merchant,
        category,
        amount,
        transactionNum,
        date,
        time,
        expense_income,
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

  async getExpensesByCategoryAndAccount(category, cc_num) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT * FROM transactions WHERE category = ? AND cc_num = ? AND expense_income = 1 ORDER BY transaction_date DESC',
        [category, cc_num],
      )

      if (rows.length === 0) {
        throw generateError('No expenses found for this category.', 404)
      }

      return rows
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async getIncomesByCategoryAndAccount(category, cc_num) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT * FROM transactions WHERE category = ? AND cc_num = ? AND expense_income = 0 ORDER BY transaction_date DESC',
        [category, cc_num],
      )

      if (rows.length === 0) {
        throw generateError('No incomes found for this category.', 404)
      }

      return rows
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async getTotalIncomesByCategoryAndAccount(category, cc_num) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT SUM(amount) AS total FROM transactions WHERE category = ? AND cc_num = ? AND expense_income = 0',
        [category, cc_num],
      )

      if (rows.length === 0) {
        throw generateError('No incomes found for this category.', 404)
      }

      return rows[0]
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async getTotalExpensesByCategoryAndAccount(category, cc_num) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT SUM(amount) AS total FROM transactions WHERE category = ? AND cc_num = ? AND expense_income = 1',
        [category, cc_num],
      )

      if (rows.length === 0) {
        throw generateError('No expenses found for this category.', 404)
      }

      return rows[0]
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async getExpensesByCategoryAndAccount(category, cc_num) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT * FROM transactions WHERE category = ? AND cc_num = ? AND expense_income = 1 ORDER BY transaction_date DESC',
        [category, cc_num],
      )

      if (rows.length === 0) {
        throw generateError('No expenses found for this category.', 404)
      }

      return rows
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async getTransactionsByAccount(cc_num) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT * FROM transactions WHERE cc_num = ? ORDER BY transaction_date DESC',
        [cc_num],
      )

      if (rows.length === 0) {
        throw generateError('No transactions found for this account.', 404)
      }

      return rows
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async getExpensesByAccount(cc_num) {
    let connection;
    try {
      connection = await getConnection();
      const query = `
            SELECT * FROM transactions
            WHERE cc_num = ? AND expense_income = 1
            ORDER BY transaction_date DESC;
        `;
      const [rows] = await connection.query(query, [cc_num]);

      if (rows.length === 0) {
        throw generateError('No expenses found for this account.', 404);
      }

      return rows;
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getIncomesByAccount(cc_num) {
    let connection;
    try {
      connection = await getConnection();
      const query = `
            SELECT * FROM transactions
            WHERE cc_num = ? AND expense_income = 0
            ORDER BY transaction_date DESC;
        `;
      const [rows] = await connection.query(query, [cc_num]);

      if (rows.length === 0) {
        throw generateError('No incomes found for this account.', 404);
      }

      return rows;
    } catch (error) {
      console.error('Error fetching incomes:', error);
      throw error;
    } finally {
      if (connection) {
        connection.release();
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

  async listTransactionsByDateRangeAndAccount(startDate, endDate, cc_num) {
    let connection
    try {
      connection = await getConnection()
      const [rows] = await connection.query(
        'SELECT * FROM transactions WHERE cc_num = ? AND transaction_date >= ? AND transaction_date <= ? ORDER BY transaction_date DESC',
        [cc_num, startDate, endDate],
      )
      return rows
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }
}
