import { Router } from 'express'
import {
  createTransaction,
  findTransactions
} from '../controllers/transaction.controller.js'
import { authRoutesValidation } from '../middlewares/auth.middleware.js'
import { transactionSchemaValidation } from '../middlewares/transaction.middleware.js'

const router = Router()

router.use(authRoutesValidation)
router.post("/transactions", transactionSchemaValidation, createTransaction)
router.get("/transactions", findTransactions)

export default router