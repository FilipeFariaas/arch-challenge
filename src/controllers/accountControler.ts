import { Request, Response } from 'express'

import Account from '@models/accountModel'

class AccountController {
  public async getAll (req: Request, res: Response): Promise<Response> {
    const accounts = await Account.find()

    return res.json(accounts)
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const account = await Account.create(req.body)

    return res.json(account)
  }
}

export default new AccountController()
