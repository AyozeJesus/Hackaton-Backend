import express from 'express';
import {
  createTransactionController,
  getTransactionByIdController,
  updateTransactionController,
  deleteTransactionController,
  listTransactionsByCategoryController,
  getExpensesByAccountController,
  getIncomesByAccountController,
  getTotalExpensesByAccountController,
  getAllIncomesByCategoryAndAccountController,
  getAllExpensesByCategoryAndAccountController,
  getExpensesByCategoryController,
  getIncomesByCategoryAndAccountController,
  getExpensesByCategoryAndAccountController,
  getTotalIncomesByAccountController,
  listTransactionsByDateRangeAndAccountController
} from '../Controllers/Transaction.js';
import { authUser } from '../Middlewares/auth.js';

const transactionRoutes = express.Router();

// Crear una transacción
transactionRoutes.post('/transactions', authUser, createTransactionController);

// Obtener transacción por ID
transactionRoutes.get('/transactions/:id', authUser, getTransactionByIdController);

// Actualizar transacción
transactionRoutes.put('/transactions/:id', authUser, updateTransactionController);

// Eliminar transacción
transactionRoutes.delete('/transactions/:id', authUser, deleteTransactionController);

// Listar transacciones por categoría
transactionRoutes.get('/transactions/category/:category', authUser, listTransactionsByCategoryController);

// Gastos por cuenta
transactionRoutes.get('/accounts/:cc_num/expenses', authUser, getExpensesByAccountController);

// Ingresos por cuenta
transactionRoutes.get('/accounts/:cc_num/incomes', authUser, getIncomesByAccountController);

// Gastos totales por cuenta
transactionRoutes.get('/accounts/:cc_num/expenses/total', authUser, getTotalExpensesByAccountController);

// Ingresos totales por cuenta
transactionRoutes.get('/accounts/:cc_num/incomes/total', authUser, getTotalIncomesByAccountController);

// Gastos por categoría y cuenta
transactionRoutes.get('', authUser, getExpensesByCategoryAndAccountController);

// Ingresos por categoría y cuenta
transactionRoutes.get('/accounts/:cc_num/incomes/category/:category', authUser, getIncomesByCategoryAndAccountController);

// Listar transacciones por rango de fechas y cuenta
transactionRoutes.get(
  '/transactions/daterange',
  authUser,
  listTransactionsByDateRangeAndAccountController
);

export { transactionRoutes };