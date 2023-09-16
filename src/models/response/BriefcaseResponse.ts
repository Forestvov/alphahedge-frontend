import { Pageable } from 'models/IPageable'

export interface IGetBriefcaseResponse {
  content: IBriefcaseActive[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export interface IBriefcaseActive extends IBriefcase {
  briefcaseAccountId: number
  accountId: number
  accountFio: string
  amountMax: any
  gainAmount: any
  remainDays: number
  amount: number
  image: string
  createddate: string
  createdDateShow: any
  briefcaseAccountStatus: string
  briefcaseInvestStatus: 'Enable' | 'Disable'
}

export interface IBriefcase {
  briefcaseId: number
  briefcaseName: string
  briefcaseStatus: string
  amountMin: number
  ranges: number
  percents: number
}

export interface IGetGainBriefcaseResponse {
  gainSum: null | string
  briefcaseCount: null | string
  page: IGainContent
}

export interface IGainContent {
  content: IGainItem[]
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

export interface IGainItem {
  briefcaseAccountGainId: number
  briefcaseaccountid: number
  briefcaseId: number
  briefcaseName: any
  accountId: number
  fio: string
  image: string
  code: string
  briefcaseAmount: number
  gainAmount: number
  createdDate: string
}
