import express from 'express';
import {
    createExpensesPreventions,
    createIncomesPreventions
} from '../Controllers/MachineLearning/preventions.js';
import { authUser } from '../Middlewares/auth.js'

const preventionsRoutes = express.Router();

preventionsRoutes.get('/preventions/expenses', authUser, createExpensesPreventions);
preventionsRoutes.get('/preventions/incomes', authUser, createIncomesPreventions);

export { preventionsRoutes };