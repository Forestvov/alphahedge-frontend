export interface IPhotoRequest {
  file: string
  typeFile: 'MAIN' | 'BACK'
}

export interface ISettingProfileRequest {
  profileSettingsCode: string
  value: Date
}

export interface ISaveTokenRequest {
  currentTypeId?: string
  currencyTypeId?: string
  value: string
}
