import { Request, Response } from 'express'

import Account from '@models/accountModel'

class AccountController {
  public async getAccount (req: Request, res: Response): Promise<Response> {
    const account = await Account.findById(req.params.id)

    return res.json(account)
  }

  public async createAccount (req: Request, res: Response): Promise<Response> {
    const account = await Account.create(req.body)

    return res.json(account)
  }

  public async getAccountBalance (req: Request, res: Response): Promise<Response> {
    const accountBalance = await Account.findById(req.params.id, 'balance')

    return res.json(accountBalance)
  }
}

export default new AccountController()
