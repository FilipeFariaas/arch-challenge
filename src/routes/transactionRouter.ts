import { Router } from 'express'

import TransactionController from '@controllers/transactionController'

const transactionRouter = Router()

transactionRouter.route('/:id').get(TransactionController.getAllAccountTransactions)
transactionRouter.route('/').post(TransactionController.createTransaction)

export default transactionRouter
