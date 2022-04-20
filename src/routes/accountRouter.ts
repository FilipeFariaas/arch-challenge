import { Router } from 'express'

import AccountController from '@controllers/accountControler'

const accountRouter = Router()

accountRouter.route('/:id').get(AccountController.getAccount).delete(AccountController.deleteAccount)
accountRouter.route('/:id/balance').get(AccountController.getAccountBalance)
accountRouter.route('/').get(AccountController.getAllAccounts).post(AccountController.createAccount)

export default accountRouter
