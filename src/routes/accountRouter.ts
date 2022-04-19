import { Router } from 'express'

import AccountController from '@controllers/accountControler'

const router = Router()

router.route('/:id').get(AccountController.getAccount)
router.route('/').post(AccountController.createAccount)

export default router
