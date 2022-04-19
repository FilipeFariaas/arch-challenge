import { Schema, model, Document } from 'mongoose'

interface TransactionInterface extends Document {
  transactionValue: number,
  transactionDate: Date,
  transactionType: string
}

const TransactionSchema = new Schema({
  transactionValue: Number,
  transactionDate: Date,
  transactionType: String
}, {
  timestamps: true
})

export default model<TransactionInterface>('Transaction', TransactionSchema)
