import dotenv from 'dotenv';
dotenv.config();
import { getConnection } from '../../UserRepository/MySQLClient.js';
import bcrypt from 'bcrypt';
import chalk from 'chalk';
import fs from 'fs';
import csv from 'csv-parser';
import mysql from 'mysql2/promise';
  

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

    console.log(chalk.yellow('Loading data from CSV'));
    await loadDataFromCSV(connection, 'src/infrastructure/Shared/migrations/data.csv');



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

async function loadDataFromCSV(connection, filename) {
  try {
    const stream = fs.createReadStream(filename);

    for await (const row of stream.pipe(csv())) {
      await insertData(
        row.cc_num,
        row.merchant,
        row.category,
        row.amount,
        row.transaction_num,
        row.transaction_date,
        row.transaction_time,
        row.expense_income,
      );
    }

    console.log('CSV file successfully processed');
  } catch (error) {
    console.error('Error processing CSV file:', error);
  }
}

async function insertData(cc_num, merchant, category, amount, transaction_num, transaction_date, transaction_time, expense_income) {
 
  const connection = await mysql.createConnection({
    address: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD || 'Skybricks12',
    database: 'backend-union',
  });

  const query = `
        INSERT INTO transactions (cc_num, merchant, category, amount, transaction_num, transaction_date, transaction_time, expense_income)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const values = [cc_num, merchant, category, amount, transaction_num, transaction_date, transaction_time, expense_income];
  
  try {
    await connection.query(query, values);
    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    connection.end();
  }

}


main();