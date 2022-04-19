import { Request, Response } from 'express'

import Transaction from '@models/transactionModel'
import Account from '@models/accountModel'

class TransactionController {
  public async getAllAccountTransactions (req: Request, res: Response): Promise<Response> {
    const transactions = await Transaction.find()

    // const balance = await Account.findById('625e09d9dea82d194642247e', { balance: 1, _id: 0 })
    // console.log(transactions[0].transactionValue)
    // console.log(balance)

    return res.json(transactions)
  }

  public async createTransaction (req: Request, res: Response): Promise<Response> {
    const transaction = await Transaction.create(req.body)

    let { transactionValue, transactionType, account } = transaction

    console.log(transactionValue)
    console.log(transactionType)
    console.log(account.valueOf())

    const { balance } = await Account.findById(account.valueOf())

    if (transactionType === 'debito') {
      transactionValue = -Math.abs(transactionValue)
    }

    const newBalance = await Account.findByIdAndUpdate('625e09d9dea82d194642247e', {
      balance: balance + transactionValue
    })

    return res.json(transaction)
  }
}

export default new TransactionController()
