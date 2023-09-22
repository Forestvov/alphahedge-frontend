import { AxiosResponse } from 'axios'

import { IReferalResponse } from 'models/response/ReferalResponse'

import { queryPhp } from 'helpers/queryPhp'

import { ISort } from 'models/request/ISort'

import $api from '../http'

export default class ReferalService {
  static async geReferal(
    data: ISort,
  ): Promise<AxiosResponse<IReferalResponse>> {
    return $api.get<IReferalResponse>(`/referal/my?${queryPhp(data)}`)
  }
}
