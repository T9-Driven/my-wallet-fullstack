import joi from 'joi'

export const transactionSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().min(10).required(),
  type: joi.string().valid("entrada", "saida").required(),
  user: joi.object().required(),
  createdAt: joi.string().required()
})