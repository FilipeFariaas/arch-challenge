import { Schema, model } from 'mongoose'

interface AccountInterface {
  accountType: string,
  holder: string
}

const AccountSchema = new Schema({
  accountType: String,
  holder: String
})

export default model<AccountInterface>('Account', AccountSchema)
