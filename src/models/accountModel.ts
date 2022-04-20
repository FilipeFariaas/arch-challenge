import mongoose, { Schema, model } from 'mongoose'

interface AccountInterface {
  accountType: string,
  holder: string,
  balance: number
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  ]
}

const AccountSchema = new Schema({
  accountType: String,
  holder: String,
  balance: {
    type: Number,
    default: 0
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction'
    }
  ]
})

AccountSchema.pre(/^find/, function (this: any, next) {
  this.populate({
    path: 'transactions',
    select: ['transactionValue', 'transactionDate', 'transactionType']
  })

  next()
})

export default model<AccountInterface>('Account', AccountSchema)
