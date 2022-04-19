import mongoose, { Schema, model, Document } from 'mongoose'

interface TransactionInterface extends Document {
  transactionValue: number,
  transactionDate: Date,
  transactionType: string
  // account: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Account'
  // }
}

const TransactionSchema = new Schema({
  transactionValue: Number,
  transactionDate: Date,
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

export default model<TransactionInterface>('Transaction', TransactionSchema)
