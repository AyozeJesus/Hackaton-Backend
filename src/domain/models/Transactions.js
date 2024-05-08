export class Transaction {
  constructor(
    userId,
    merchantId,
    category,
    amount,
    transactionNum,
    unixTime,
    transactionDate,
    transactionTime,
    expenseIncome,
  ) {
    this.userId = userId
    this.merchantId = merchantId
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
      data.userId,
      data.merchantId,
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

  getUserId() {
    return this.userId
  }

  getMerchantId() {
    return this.merchantId
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
