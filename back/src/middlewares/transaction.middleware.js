import dayjs from 'dayjs'
import { transactionSchema } from '../schema/transaction.schema.js'

export function transactionSchemaValidation(req, res, next) {
  const { value, description, type } = req.body
  const user = res.locals.user

  const transaction = {
    value,
    description,
    type,
    user: user._id,
    createdAt: dayjs().format("DD/MM/YYYY")
  }

  const { error } = transactionSchema.validate(transaction, { abortEarly: false })

  if (error) {
    const errorMessages = error.details.map(detail => detail.message)
    return res.status(400).send(errorMessages)
  }

  res.locals.transaction = transaction

  next()

}