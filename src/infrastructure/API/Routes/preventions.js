import express from 'express';
import {
    createPreventions,
} from '../Controllers/MachineLearning/preventions.js';
import { authUser } from '../Middlewares/auth.js'

const preventionsRoutes = express.Router();

transactionRoutes.get('/preventions', authUser, createPreventions);