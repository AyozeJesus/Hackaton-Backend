import express from 'express'
import {
  newUserController,
  loginController,
  getUserController,
  activateAccountController,
} from '../Controllers/Users.js'
import { authUser } from '../Middlewares/auth.js'

const userRoutes = express.Router()

userRoutes.post('/user/register', newUserController)

userRoutes.post('/user/login', loginController)

userRoutes.get('/user/:id', authUser, getUserController)

userRoutes.get('/user/activate/:token', activateAccountController)

export { userRoutes }
