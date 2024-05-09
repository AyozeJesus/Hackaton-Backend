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
  const usersToInsert = [
    {
      "name": "Elena",
      "lastname": "Gonzalez",
      "email": "egonzalez@example.com",
      "password": "a1b2c3d4",
      "isActivated": true
    },
    {
      "name": "David",
      "lastname": "Smith",
      "email": "dsmit2h@example.com",
      "password": "p@ssw0rd!",
      "isActivated": true
    },
    {
      "name": "Sophia",
      "lastname": "Johnson",
      "email": "sjohnson2@example.com",
      "password": "qwerty123",
      "isActivated": true
    },
    {
      "name": "James",
      "lastname": "Williams",
      "email": "2jwilliams@example.com",
      "password": "pass1234",
      "isActivated": true
    },
    {
      "name": "Isabella",
      "lastname": "Martinez",
      "email": "2imartinez@example.com",
      "password": "abcd1234",
      "isActivated": true
    },
    {
      "name": "Liam",
      "lastname": "Brown",
      "email": "lbr4own@example.com",
      "password": "password123",
      "isActivated": true
    },
    {
      "name": "Mia",
      "lastname": "Jones",
      "email": "mjon5es@example.com",
      "password": "securepass",
      "isActivated": true
    },
    {
      "name": "Noah",
      "lastname": "Taylor",
      "email": "nta6ylor@example.com",
      "password": "myPa$$word",
      "isActivated": true
    },
    {
      "name": "Emma",
      "lastname": "Garcia",
      "email": "egar3cia@example.com",
      "password": "pa$$w0rd!",
      "isActivated": true
    },
    {
      "name": "Oliver",
      "lastname": "Davis",
      "email": "odav3is@example.com",
      "password": "test1234",
      "isActivated": true
    },
    {
      "name": "Elena",
      "lastname": "Gonzalez",
      "email": "egonzalez1@example.com",
      "password": "a1b2c3d4",
      "isActivated": true
    },
    {
      "name": "David",
      "lastname": "Smith",
      "email": "dsmith@example.com",
      "password": "p@ssw0rd!",
      "isActivated": true
    },
    {
      "name": "Sophia",
      "lastname": "Johnson",
      "email": "sjohnson@example.com",
      "password": "qwerty123",
      "isActivated": true
    },
    {
      "name": "James",
      "lastname": "Williams",
      "email": "jwilliams@example.com",
      "password": "pass1234",
      "isActivated": true
    },
    {
      "name": "Isabella",
      "lastname": "Martinez",
      "email": "imartinez@example.com",
      "password": "abcd1234",
      "isActivated": true
    },
    {
      "name": "Liam",
      "lastname": "Brown",
      "email": "lbrown@example.com",
      "password": "password123",
      "isActivated": true
    },
    {
      "name": "Mia",
      "lastname": "Jones",
      "email": "mjones@example.com",
      "password": "securepass",
      "isActivated": true
    },
    {
      "name": "Noah",
      "lastname": "Taylor",
      "email": "ntaylor@example.com",
      "password": "myPa$$word",
      "isActivated": true
    },
    {
      "name": "Emma",
      "lastname": "Garcia",
      "email": "egarcia@example.com",
      "password": "pa$$w0rd!",
      "isActivated": true
    },
    {
      "name": "Oliver",
      "lastname": "Davis",
      "email": "odavis@example.com",
      "password": "test1234",
      "isActivated": true
    }

  ]

  for (const user of usersToInsert) {
    const saltRounds = 10
    user.password = await bcrypt.hash(user.password, saltRounds)
    await connection.query(`INSERT INTO users SET ?`, user)
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
  `);
  const accountToInsert = [
    {
      "user_id": "1",
      "cc_num": "4512828414983801774"
    },
    {
      "user_id": "2",
      "cc_num": "4512828414983801775"
    },
    {
      "user_id": "3",
      "cc_num": "4512828414983801782"
    },
    {
      "user_id": "4",
      "cc_num": "4512828414983801781"
    },
    {
      "user_id": "5",
      "cc_num": "4512828414983801780"
    },
    {
      "user_id": "6",
      "cc_num": "4512828414983801779"
    },
    {
      "user_id": "7",
      "cc_num": "4512828414983801778"
    },
    {
      "user_id": "8",
      "cc_num": "4512828414983801777"
    },
    {
      "user_id": "9",
      "cc_num": "4512828414983801776"
    },
    {
      "user_id": "10",
      "cc_num": "4512828414983801783"
    },
    {
      "user_id": "11",
      "cc_num": "6538441737335434"
    },
    {
      "user_id": "12",
      "cc_num": "30270432095985"
    },
    {
      "user_id": "13",
      "cc_num": "6538891242532018"
    },
    {
      "user_id": "14",
      "cc_num": "4364010865167176"
    },
    {
      "user_id": "15",
      "cc_num": "4642255475285942"
    },
    {
      "user_id": "16",
      "cc_num": "344709867813900"
    },
    {
      "user_id": "17",
      "cc_num": "6011438889172900"
    },
    {
      "user_id": "18",
      "cc_num": "4512828414983801773"
    },
    {
      "user_id": "19",
      "cc_num": "4904681492230012"
    },
    {
      "user_id": "20",
      "cc_num": "4586810168620942"
    }

  ]
  for (const account of accountToInsert) {
    await connection.query(`INSERT INTO accounts SET ?`, account)
  }

  console.log(chalk.green('Table accounts created and populated with some accounts.'));
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

    // Crear la conexión fuera del bucle
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: process.env.DB_PASSWORD || 'Skybricks12',
      database: 'backend-union',
    });

    for await (const row of stream.pipe(csv())) {
      await insertData(connection, row.cc_num, row.merchant, row.category, row.amount, row.transaction_num, row.transaction_date, row.transaction_time, row.expense_income);
    }

    console.log('CSV file successfully processed');
    
    // Cerrar la conexión después de procesar el archivo CSV
    await connection.end();
  } catch (error) {
    console.error('Error processing CSV file:', error);
  }
}

// Función para insertar datos en la base de datos
async function insertData(connection, cc_num, merchant, category, amount, transaction_num, transaction_date, transaction_time, expense_income) {
  const query = `
    INSERT INTO transactions (cc_num, merchant, category, amount, transaction_num, transaction_date, transaction_time, expense_income)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [cc_num, merchant, category, amount, transaction_num, transaction_date, transaction_time, expense_income];

  try {
    await connection.query(query, values);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}


main();