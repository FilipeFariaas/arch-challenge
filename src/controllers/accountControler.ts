import { Request, Response } from 'express'

import Account from '@models/accountModel'
import { getRedis } from 'src/redisConfig'

class AccountController {
  public async getAllAccounts (req: Request, res: Response): Promise<Response> {
    try {
      const accounts = await Account.find()

      return res.status(200).json({
        status: 'success',
        data: {
          accounts
        }
      })
    } catch (error) {
      return res.status(404).json({
        status: 'fail',
        message: error
      })
    }
  }

  public async getAccount (req: Request, res: Response): Promise<Response> {
    try {
      const account = await Account.findById(req.params.id)

      return res.status(200).json({
        status: 'success',
        data: {
          account
        }
      })
    } catch (error) {
      return res.status(404).json({
        status: 'fail',
        message: error
      })
    }
  }

  public async createAccount (req: Request, res: Response): Promise<Response> {
    try {
      const account = await Account.create(req.body)

      return res.status(200).json({
        status: 'success',
        data: {
          account
        }
      })
    } catch (error) {
      return res.status(404).json({
        status: 'fail',
        message: error
      })
    }
  }

  public async getAccountBalance (req: Request, res: Response): Promise<Response> {
    try {
      const accountId = req.params.id

      const redisAccountBalance = await getRedis(`account-${accountId}`)

      if (!redisAccountBalance) {
        const cachedAccountBalance = await Account.findById(accountId, { balance: true, _id: false })

        return res.status(200).json({
          status: 'success',
          data: {
            cachedAccountBalance
          }
        })
      } else {
        const cachedAccountBalance = JSON.parse(redisAccountBalance)

        return res.status(200).json({
          status: 'success',
          data: {
            cachedAccountBalance
          }
        })
      }
    } catch (error) {
      return res.status(404).json({
        status: 'fail',
        message: error
      })
    }
  }

  public async deleteAccount (req: Request, res: Response): Promise<Response> {
    try {
      await Account.findByIdAndDelete(req.params.id)

      return res.status(200).json({
        status: 'success',
        data: {
          null: null
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

export default new AccountController()
