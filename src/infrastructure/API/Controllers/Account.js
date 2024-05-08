import AccountService from '../services/AccountService'

const accountService = new AccountService()

export async function createAccount(req, res) {
  const { user_id, cc_num } = req.body
  try {
    const account = await accountService.createAccount(user_id, cc_num)
    res.status(201).json(account)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getAccount(req, res) {
  const { user_id } = req.params
  try {
    const account = await accountService.getAccountByUserId(user_id)
    if (account) {
      res.json(account)
    } else {
      res.status(404).json({ message: 'Account not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
