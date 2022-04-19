import { Router } from 'express'

import TransactionController from '@controllers/transactionController'

const transactionRouter = Router()

transactionRouter.route('/').get(TransactionController.getAllAccountTransactions)
transactionRouter.route('/:id').post(TransactionController.createTransaction)

export default transactionRouter
