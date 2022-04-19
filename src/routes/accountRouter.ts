import { Router } from 'express'

import AccountController from '@controllers/accountControler'

const accountRouter = Router()

accountRouter.route('/:id').get(AccountController.getAccount)
accountRouter.route('/').post(AccountController.createAccount)

export default accountRouter
