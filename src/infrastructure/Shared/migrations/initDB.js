import dotenv from 'dotenv';
dotenv.config();
import { getConnection } from '../../UserRepository/MySQLClient.js';
import bcrypt from 'bcrypt';
import chalk from 'chalk';

async function main() {
  let connection;
  try {
    connection = await getConnection();
    console.log(chalk.green('Connected'));
    console.log(chalk.yellow('Dropping existing tables'));
    await dropTableIfExists(connection, 'transactions');
    await dropTableIfExists(connection, 'accounts');
    await dropTableIfExists(connection, 'email_verification');
    await dropTableIfExists(connection, 'users');

    console.log(chalk.yellow('Creating tables'));
    await createEmailsTable(connection);
    await createUsersTable(connection);
    await createAccountsTable(connection);
    await createTransactionsTable(connection);

    console.log(chalk.yellow('Inserting sample data'));
    await insertSampleData(connection);
  } catch (error) {
    console.error(chalk.red(error));
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

async function dropTableIfExists(connection, tableName) {
  await connection.query(`SET FOREIGN_KEY_CHECKS = 0`);
  await connection.query(`DROP TABLE IF EXISTS ${tableName}`);
  console.log(chalk.green(`Table ${tableName} dropped if exists.`));
}

async function createEmailsTable(connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS email_verification (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        token VARCHAR(255),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);
  console.log(chalk.green('Table email_verification created'));
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
  `);
  console.log(chalk.green('Table users created'));
}

async function createAccountsTable(connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS accounts (
        user_id INT,
        cc_num VARCHAR(255) PRIMARY KEY,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);
  console.log(chalk.green('Table accounts created'));
}

async function createTransactionsTable(connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS transactions (
        transaction_id INT AUTO_INCREMENT PRIMARY KEY,
        cc_num VARCHAR(255),
        merchant VARCHAR(255),
        category VARCHAR(50),
        amount FLOAT,
        transaction_num VARCHAR(255),
        transaction_date DATE,
        transaction_time TIME,
        expense_income BOOLEAN,
        FOREIGN KEY (cc_num) REFERENCES accounts(cc_num)
    );
  `);
  console.log(chalk.green('Table transactions created'));
}

async function insertSampleData(connection) {
  const users = [
    { name: 'Alice', lastname: 'Smith', email: 'alice@example.com', password: await bcrypt.hash('password123', 10) },
    { name: 'Bob', lastname: 'Jones', email: 'bob@example.com', password: await bcrypt.hash('password456', 10) }
  ];
  for (let user of users) {
    await connection.query('INSERT INTO users SET ?', user);
  }

  const accounts = [
    { user_id: 1, cc_num: '1234567890123456' },
    { user_id: 2, cc_num: '6543210987654321' }
  ];
  for (let account of accounts) {
    await connection.query('INSERT INTO accounts SET ?', account);
  }

  const transactions = [
    { cc_num: '1234567890123456', merchant: 1, category: 'Electronics', amount: 200.50, transaction_num: 1001, transaction_date: '2023-01-10', transaction_time: '14:00:00', expense_income: false },
    { cc_num: '6543210987654321', merchant: 2, category: 'Groceries', amount: 75.25, transaction_num: 1002, transaction_date: '2023-01-11', transaction_time: '10:30:00', expense_income: true }
  ];
  for (let transaction of transactions) {
    await connection.query('INSERT INTO transactions SET ?', transaction);
  }
}

main();