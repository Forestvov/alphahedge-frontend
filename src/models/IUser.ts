import { UserType } from 'models/UserType'
import { StatusAccountType } from 'models/StatusAccountType'

export interface IUser {
  accountId: number
  idNumber: any
  userName: string
  email: string
  balance: number
  fio: string
  registeredDate: string
  role: UserType
  status: StatusAccountType
  verifiedStatus?: string
}
