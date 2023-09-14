import { IUser } from 'models/IUser'
import { Pageable } from 'models/IPageable'

export interface IUsersResponse {
  content: IUser[]
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

export interface IAdvancedResponse {
  content: IAdvance[]
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

export interface IAdvance {
  briefcaseAccountId: number
  briefcaseId: number
  accountId: number
  accountFio: string
  accountUsername: string
  briefcaseName?: string
  briefcaseCode: string
  amount: number
  createddate: string
  briefcaseAccountStatus: string
  briefcaseAccountOrderToCloseStatus: string
}

export interface IFile {
  fileId: number
  fileType: string
  file: string
}

export interface IVerification {
  accountId: number
  idNumber: any
  userName: string
  email: string
  fio: string
  registeredDate: string
  balance: number
  role: string
  status: string
  verifiedStatus: string
  files: IFile[]
}

export interface VerificationList {
  content: IVerification[]
  pageable: Pageable
  totalPages: number
  totalElements: number
  last: boolean
  size: number
  number: number
  numberOfElements: number
  first: boolean
  empty: boolean
}
