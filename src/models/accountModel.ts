import { Schema, model } from 'mongoose'

interface AccountInterface {
  accountType: string,
  holder: string,
  balance: number
}

const AccountSchema = new Schema({
  accountType: String,
  holder: String,
  // balance: {
  //   type: Number,
  //   default: 0
  // }
  balance: Number
})

export default model<AccountInterface>('Account', AccountSchema)
