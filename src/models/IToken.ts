export interface IToken {
  currencyTypeId: number
  currencyToken: string
  value: string
  image: string
  qrCode: string
}

export interface ITokenCovert {
  symbol: string
  price: string
}

export interface TransactionBody {
  transactionId: number
  accountId: number
  transactionType: string
  transactionStatus: string
  transactionDate: string
  currencyToken: string
  typePay: string
  amount: number
  fio: string
  username: string
  qrCode: string
  image: any
  contact: string
}

export interface TransactionCodeBody {
  settingCode: string
  settingValue: string
}
