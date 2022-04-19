import { Request, Response } from 'express'

import Transaction from '@models/transactionModel'

class TransactionController {
  public async getAllAccountTransactions (req: Request, res: Response): Promise<Response> {
    const transactions = await Transaction.find()

    return res.json(transactions)
  }

  public async createTransaction (req: Request, res: Response): Promise<Response> {
    const transaction = await Transaction.create(req.body)

    return res.json(transaction)
  }
}

export default new TransactionController()
