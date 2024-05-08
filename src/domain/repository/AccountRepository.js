import { getConnection } from '../../infrastructure/UserRepository/MySQLClient.js'

class AccountRepository {
  async createAccount(account) {
    const connection = await getConnection()
    try {
      const result = await connection.query('INSERT INTO accounts SET ?', {
        user_id: account.user_id,
        cc_num: account.cc_num,
      })
      return result
    } finally {
      connection.release()
    }
  }

  async findAccountByUserId(user_id) {
    const connection = await getConnection()
    try {
      const [rows] = await connection.query(
        'SELECT * FROM accounts WHERE user_id = ?',
        [user_id],
      )
      connection.release()
      return rows
    } finally {
      connection.release()
    }
  }
}

export default AccountRepository
