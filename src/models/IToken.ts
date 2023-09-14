export interface IToken {
  currencyTypeId?: number
  currencyToken?: string
  image?: string
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
  image: any
}
