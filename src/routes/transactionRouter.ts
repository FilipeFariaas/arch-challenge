import { Router } from 'express'

import TransactionController from '@controllers/transactionController'

const router = Router()

router.route('/').get(TransactionController.getAllAccountTransactions)
router.route('/:id').post(TransactionController.createTransaction)

export default router
