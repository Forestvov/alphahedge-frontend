import { AxiosResponse } from 'axios'

import {
  IProfileField,
  IProfileToken,
  IResponseBalance,
  IResponseProfile,
} from 'models/response/AccountResponse'
import {
  IPhotoRequest,
  ISaveTokenRequest,
  ISettingProfileRequest,
} from 'models/request/AccountRequest'

import $api from '../http'

export default class AccountServices {
  static async getProfile(): Promise<AxiosResponse<IResponseProfile>> {
    return $api.get<IResponseProfile>('/account/me')
  }

  static async getBalance(): Promise<AxiosResponse<IResponseBalance>> {
    return $api.get<IResponseBalance>('/account/balance')
  }

  static async updateProfile(data: IProfileField): Promise<AxiosResponse> {
    return $api.put('/account/me', data)
  }

  static async sendIdPhoto(data: IPhotoRequest): Promise<AxiosResponse> {
    return $api.post('/account/file', data)
  }

  static async saveTokens(data: ISaveTokenRequest[]): Promise<AxiosResponse> {
    return $api.post('/account/my/token/list', data)
  }

  static async getProfileTokens(): Promise<AxiosResponse<IProfileToken[]>> {
    return $api.get<IProfileToken[]>('/account/my/tokens')
  }

  static async settingProfile(
    data: ISettingProfileRequest,
  ): Promise<AxiosResponse> {
    return $api.post('/account/setting/set', data)
  }
}
