import Joi from 'joi'

export const transactionSchema = Joi.object({
  userId: Joi.number().integer().required(),
  merchantId: Joi.number().integer().required(),
  category: Joi.string().max(50).required(),
  amount: Joi.number().precision(2).required(),
  transactionNum: Joi.string().max(50).required(),
  unixTime: Joi.number().integer().required(),
  transactionDate: Joi.date().iso().required(),
  transactionTime: Joi.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/)
    .required(),
  expenseIncome: Joi.boolean().required(),
})

export const updateTransactionSchema = Joi.object({
  category: Joi.string().max(50).optional(),
  amount: Joi.number().precision(2).optional(),
  transactionDate: Joi.date().iso().optional(),
  transactionTime: Joi.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/)
    .optional(),
  expenseIncome: Joi.boolean().optional(),
})

export const transactionIdSchema = Joi.object({
  transactionId: Joi.string().required(),
})

export const transactionDateRangeSchema = Joi.object({
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required(),
})
