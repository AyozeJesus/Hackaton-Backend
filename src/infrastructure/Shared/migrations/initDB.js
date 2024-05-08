import dotenv from 'dotenv'
dotenv.config()
import { getConnection } from '../../UserRepository/MySQLClient.js'
import bcrypt from 'bcrypt'
import chalk from 'chalk'

async function main() {
  let connection
  try {
    connection = await getConnection()
    console.log(chalk.green('Connected'))
    console.log(chalk.yellow('Dropping existing tables'))
    await dropTableIfExists(connection, 'transactions')
    await dropTableIfExists(connection, 'accounts')
    await dropTableIfExists(connection, 'email_verification')
    await dropTableIfExists(connection, 'users')

    console.log(chalk.yellow('Creating tables'))
    await createEmailsTable(connection)
    await createUsersTable(connection)
    await createAccountsTable(connection)
    await createTransactionsTable(connection)
  } catch (error) {
    console.error(chalk.red(error))
  } finally {
    if (connection) connection.release()
    process.exit()
  }
}

async function dropTableIfExists(connection, tableName) {
  await connection.query(`SET FOREIGN_KEY_CHECKS = 0`)
  await connection.query(`DROP TABLE IF EXISTS ${tableName}`)
  console.log(chalk.green(`Table ${tableName} dropped if exists.`))
}

async function createEmailsTable(connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS email_verification (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        token VARCHAR(255),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `)
  console.log(chalk.green('Table email_verification created'))
}

async function createUsersTable(connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50),
        lastname VARCHAR(50),
        email VARCHAR(90) NOT NULL UNIQUE,
        password VARCHAR(90) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        isActivated BOOLEAN NOT NULL DEFAULT false
    );
  `)
  const usersToInsert = [
    // Define users here
  ]
  for (const user of usersToInsert) {
    const saltRounds = 10
    user.password = await bcrypt.hash(user.password, saltRounds)
    await connection.query('INSERT INTO users SET ?', user)
  }
  console.log(chalk.green('Table users created and populated with some users.'))
}

async function createAccountsTable(connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS accounts (
        user_id INT,
        cc_num VARCHAR(255) PRIMARY KEY,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `)
  console.log(chalk.green('Table accounts created'))
}

async function createTransactionsTable(connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS transactions (
        transaction_id INT AUTO_INCREMENT PRIMARY KEY,
        cc_num VARCHAR(255),
        merchant_id INT,
        category VARCHAR(50),
        amount FLOAT,
        unix_time INT,
        transaction_num INT,
        transaction_date DATE,
        transaction_time TIME,
        expense_income BOOLEAN,
        FOREIGN KEY (cc_num) REFERENCES accounts(cc_num)
    );
  `)
  console.log(chalk.green('Table transactions created'))
}

main()
