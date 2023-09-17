import { UserType } from 'models/UserType'

export interface IProfileField {
  userName: string
  email: string
  fam: string
  im: string
  phoneNumber: string
  country: string
}

export interface IResponseProfile extends IProfileField {
  accountId: number
  birthdate: any
  registeredDate: string
  status: string
  verifiedStatus: string
  role: UserType
  profileSetting: IProfileSetting[]
}

export interface IProfileSetting {
  profileSettingsAccountId: number
  accountId: number
  profileSettingId: number
  profileSettingCode: string
  profileSettingValue: string
  profileSettingAccountValue: Date
}

export interface IResponseBalance {
  accountId: number
  fio: string
  activeBalance: number
  actionBalance: number
  briefcaseBalance: number
  balance: number
}

export interface IProfileToken {
  currencyTypeAccountId: number
  accountId: number
  currentTypeId: number
  currencyToken: string
  image: string
  value: string
}
