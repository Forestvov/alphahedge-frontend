import { Pageable } from 'models/IPageable'

export interface ITransaction {
  accountId: number
  transactionId: number
  transactionType: string
  transactionStatus: string
  transactionDate: string
  currencyToken?: string
  typePay: string
  amount: number
  username: string
  fio: string
}

export interface ITransactionHistory {
  content: ITransaction[]
  pageable: Pageable
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  first: boolean
  numberOfElements: number
  empty: boolean
}
