import { Request, Response } from 'express'

import Account from '@models/accountModel'
import { getRedis } from 'src/redisConfig'

class AccountController {
  public async getAccount (req: Request, res: Response): Promise<Response> {
    const account = await Account.findById(req.params.id)

    return res.json(account)
  }

  public async createAccount (req: Request, res: Response): Promise<Response> {
    const account = await Account.create(req.body)

    return res.json(account)
  }

  public async getAccountBalance (req: Request, res: Response) {
    const accountId = req.params.id

    const redisAccountBalance = await getRedis(`account-${accountId}`)
    const cachedAccountBalance = JSON.parse(redisAccountBalance)

    const accountBalance = await Account.findById(accountId, 'balance')

    return res.json(cachedAccountBalance || accountBalance)
  }
}

export default new AccountController()
