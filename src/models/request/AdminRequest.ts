import { StatusAccountType } from 'models/StatusAccountType'

export interface AdminRequest {
  accountId: number
  status: StatusAccountType
}

export interface UserEmailRequest {
  email: string
}

export interface AdminGainSetRequest {
  briefcaseAccountId: string
  amount: string
  date: string
}
