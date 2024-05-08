export class Transaction {
  constructor(
    transaction_id,
    cc_num,
    merchant,
    category,
    amount,
    transactionNum,
    unixTime,
    transactionDate,
    transactionTime,
    expenseIncome,
  ) {
    this.transaction_id = transaction_id
    this.cc_num = cc_num
    this.merchant = merchant
    this.category = category
    this.amount = amount
    this.transactionNum = transactionNum
    this.unixTime = unixTime
    this.transactionDate = transactionDate
    this.transactionTime = transactionTime
    this.expenseIncome = expenseIncome
  }

  static create(data) {
    return new Transaction(
      data.transaction_id,
      data.cc_num,
      data.merchant,
      data.category,
      data.amount,
      data.transactionNum,
      data.unixTime,
      data.transactionDate,
      data.transactionTime,
      data.expenseIncome,
    )
  }

  update(data) {
    this.category = data.category ?? this.category
    this.amount = data.amount ?? this.amount
    this.transactionDate = data.transactionDate ?? this.transactionDate
    this.transactionTime = data.transactionTime ?? this.transactionTime
    this.expenseIncome = data.expenseIncome ?? this.expenseIncome
  }

  gettransaction_id() {
    return this.transaction_id
  }

  getCCNum() {
    return this.cc_num
  }

  getmerchant() {
    return this.merchant
  }

  getCategory() {
    return this.category
  }

  getAmount() {
    return this.amount
  }

  getTransactionNumber() {
    return this.transactionNum
  }

  getUnixTime() {
    return this.unixTime
  }

  getTransactionDate() {
    return this.transactionDate
  }

  getTransactionTime() {
    return this.transactionTime
  }

  isIncome() {
    return this.expenseIncome
  }
  describeTransaction() {
    const type = this.expenseIncome ? 'Income' : 'Expense'
    return `Transaction ${this.transactionNum}: ${type} of $${this.amount} in category ${this.category} on ${this.transactionDate}`
  }

  isEqual(otherTransaction) {
    return (
      this.transactionNum === otherTransaction.transactionNum &&
      this.unixTime === otherTransaction.unixTime
    )
  }
}
