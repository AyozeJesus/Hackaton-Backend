import { UserRepository } from '../../domain/repository/UserRepository.js'
import { User } from '../../domain/models/User.js'
import { UserPassword } from '../../domain/models/UserPassword.js'
import { MySQLClient } from './MySQLClient.js'

export class UserRepositoryMySQL extends UserRepository {
  constructor() {
    super()
    this.client = MySQLClient
  }

  async save(user) {
    await this.client.query(
      `INSERT INTO users (name, lastname, email, password,) VALUES (?, ?, ?, ?)`,
      [
        user.name.name,
        user.lastname.lastname,
        user.email.email,
        user.password.password,
      ],
    )
  }

  async findById(id) {
    const users = await this.client.query(`SELECT * FROM users WHERE id = $1`, [
      id,
    ])

    const user = users.rows[0]

    if (!user) {
      return null
    }

    return new User(
      user.id,
      user.username,
      user.email,
      new UserPassword(user.password),
    )
  }

  async findByEmail(email) {
    const users = await this.client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    )

    const user = users.rows[0]

    if (!user) {
      return null
    }

    return new User(
      user.id,
      user.username,
      user.email,
      new UserPassword(user.password),
    )
  }

  async existsByEmail(email) {
    const users = await this.client.query(
      `SELECT COUNT(1) FROM users WHERE email = $1`,
      [email],
    )

    return users.rows[0].count === '1'
  }

  async connect() {
    await this.client.connect()
  }

  async reset() {
    await this.client.query('DELETE FROM users')
  }

  async disconnect() {
    await this.client.end()
  }
}
