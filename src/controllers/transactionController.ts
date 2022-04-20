import { Request, Response } from 'express'

import Transaction from '@models/transactionModel'
import Account from '@models/accountModel'
import { setRedis } from 'src/redisConfig'

class TransactionController {
  public async getAllAccountTransactions (req: Request, res: Response): Promise<Response> {
    const transactions = await Transaction.find()

    return res.json(transactions)
  }

  public async createTransaction (req: Request, res: Response): Promise<Response> {
    const transaction = await Transaction.create(req.body)

    let { transactionValue, transactionType, account } = transaction

    const { balance } = await Account.findById(account.valueOf())

    if (transactionType === 'debito') {
      transactionValue = -Math.abs(transactionValue)
    }

    await Account.findByIdAndUpdate('625e09d9dea82d194642247e', {
      balance: balance + transactionValue
    })

    const newBalance = await Account.findById(account.valueOf(), { balance: true, _id: false })
    const newBalanceValue = JSON.stringify(JSON.parse(JSON.stringify(newBalance)).balance)

    await setRedis(`account-${account.valueOf()}`, newBalanceValue)

    return res.json(transaction)
  }
}

export default new TransactionController()
