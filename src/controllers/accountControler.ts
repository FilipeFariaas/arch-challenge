import { Request, Response } from 'express'

import Account from '@models/accountModel'

class AccountController {
  public async getAccount (req: Request, res: Response): Promise<Response> {
    const accounts = await Account.findById(req.params.id)

    return res.json(accounts)
  }

  public async createAccount (req: Request, res: Response): Promise<Response> {
    const account = await Account.create(req.body)

    return res.json(account)
  }
}

export default new AccountController()
