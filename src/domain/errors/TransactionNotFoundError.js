export class TransactionNotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'TransactionNotFoundError'
  }
}
