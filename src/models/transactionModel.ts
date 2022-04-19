// import { NextFunction } from 'express'
import mongoose, { Schema, model, Document } from 'mongoose'

interface TransactionInterface extends Document {
  transactionValue: number,
  transactionDate: Date,
  transactionType: string
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  }
}

const TransactionSchema = new Schema({
  transactionValue: Number,
  transactionDate: {
    type: Date,
    default: new Date().toLocaleDateString()
  },
  transactionType: String,
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

TransactionSchema.pre(/^find/, function (this: any, next) {
  this.populate({
    path: 'account',
    select: ['holder', 'balance']
  })

  next()
})

export default model<TransactionInterface>('Transaction', TransactionSchema)
