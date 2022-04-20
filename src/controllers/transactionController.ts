import { Request, Response } from 'express'

import Transaction from '@models/transactionModel'
import Account from '@models/accountModel'
import { redisClient, setRedis } from 'src/redisConfig'

class TransactionController {
  public async getAllAccountTransactions (req: Request, res: Response): Promise<Response> {
    try {
      const transactions = await Transaction.find()

      return res.status(200).json({
        status: 'success',
        data: {
          transactions
        }
      })
    } catch (error) {
      return res.status(404).json({
        status: 'fail',
        message: error
      })
    }
  }

  public async createTransaction (req: Request, res: Response): Promise<Response> {
    try {
      const transaction = await Transaction.create(req.body)

      let { transactionValue, transactionType, account } = transaction

      const { balance } = await Account.findById(account.valueOf())

      if (transactionType === 'debito') {
        transactionValue = -Math.abs(transactionValue)
      }

      await Account.findByIdAndUpdate(account.valueOf(), {
        balance: balance + transactionValue
      })

      const newBalance = await Account.findById(account.valueOf(), { balance: true, _id: false })
      const newBalanceValue = JSON.stringify(JSON.parse(JSON.stringify(newBalance)).balance)

      redisClient.flushall('ASYNC', () => console.log('Cache cleared'))

      await setRedis(`account-${account.valueOf()}`, newBalanceValue)

      return res.status(200).json({
        status: 'success',
        data: {
          transaction
        }
      })
    } catch (error) {
      return res.status(404).json({
        status: 'fail',
        message: error
      })
    }
  }
}

export default new TransactionController()
