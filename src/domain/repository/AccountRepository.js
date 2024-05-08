import { getConnection } from '../UserRepository/MySQLClient'

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
      return rows.map((row) => new Account(row.user_id, row.cc_num))
    } finally {
      connection.release()
    }
  }
}

export default AccountRepository
