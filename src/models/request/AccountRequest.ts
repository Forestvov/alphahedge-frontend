export interface IPhotoRequest {
  file: File
  typeFile: 'MAIN' | 'BACK'
}

export interface ISettingProfileRequest {
  profileSettingsCode: string
  value: Date
}

export interface ISaveTokenRequest {
  currentTypeId?: string
  currencyTypeId?: string
  qrCode?: string
  value: string
}

export interface IApiKey {
  settingCode: string
  settingValue: string
}

export interface IGetPhoto {
  fileId: number
}

export interface IGetPhotoResponse {
  file: string
}
