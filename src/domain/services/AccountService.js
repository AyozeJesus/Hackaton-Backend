import AccountRepository from '../repository/AccountRepository.js'
import Account from '../models/Account.js'

class AccountService {
  constructor() {
    this.accountRepository = new AccountRepository()
  }

  async createAccount(user_id, cc_num) {
    const account = new Account(user_id, cc_num)
    return await this.accountRepository.createAccount(account)
  }

  async getAccountByUserId(user_id) {
    return await this.accountRepository.findAccountByUserId(user_id)
  }
}

export default AccountService
