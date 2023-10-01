import { AxiosResponse } from 'axios'

import { ISort } from 'models/request/ISort'
import {
  IAdvancedResponse,
  IUsersResponse,
  VerificationList,
} from 'models/response/AdminResponse'

import { AdminGainSetRequest, AdminRequest } from 'models/request/AdminRequest'
import { IApiKey, ISaveTokenRequest } from 'models/request/AccountRequest'

import $api from '../http'

export default class AdminService {
  static async getUsers(data: ISort): Promise<AxiosResponse<IUsersResponse>> {
    return $api.put<IUsersResponse>('/account/page', data)
  }

  static async updateUserAccount(
    data: AdminRequest,
  ): Promise<AxiosResponse<IUsersResponse>> {
    return $api.put<IUsersResponse>('/account/update', data)
  }

  static async updateBriefcaseOrder(
    id: number,
    status: string,
  ): Promise<AxiosResponse<IUsersResponse>> {
    return $api.put<IUsersResponse>(
      `/briefcase-account/order-close/${id}/${status}`,
    )
  }

  static async getAdvanced(
    data: ISort,
  ): Promise<AxiosResponse<IAdvancedResponse>> {
    return $api.post<IAdvancedResponse>('/briefcase-account/page', data)
  }

  static async closeBrief(id: number): Promise<AxiosResponse> {
    return $api.put(`/briefcase-account/close/${id}`)
  }

  static async gainSetAdvanced(
    data: AdminGainSetRequest,
  ): Promise<AxiosResponse> {
    return $api.post(`/briefcase-account/gain/set`, data)
  }

  static async getTransactionHistory(data: ISort): Promise<AxiosResponse> {
    return $api.post(`/transaction/history`, data)
  }

  static async editStatusTransaction(
    id: number,
    status: string,
    transactionType: string,
    amount: number,
  ): Promise<AxiosResponse> {
    if (transactionType === 'In') {
      return $api.put('/transaction', {
        transactionId: id,
        transactionType,
        transactionStatus: status,
        amountOut: amount,
      })
    }
    return $api.put('/transaction', {
      transactionId: id,
      transactionType,
      transactionStatus: status,
      amountIn: amount,
    })
  }

  static async editAmountTransaction(
    transactionId: number,
    amount: number,
    transactionStatus: string,
    transactionType: string,
  ): Promise<AxiosResponse> {
    if (transactionType === 'In') {
      return $api.put('/transaction', {
        transactionId,
        amountOut: amount,
        transactionStatus,
        transactionType,
      })
    }

    return $api.put('/transaction', {
      transactionId,
      amountIn: amount,
      transactionStatus,
      transactionType,
    })
  }

  static async getVerificationList(
    data: ISort,
  ): Promise<AxiosResponse<VerificationList>> {
    return $api.put<VerificationList>(`/account/page/verification`, data)
  }

  static async updateVerification(
    accountId: number,
    verifiedStatus: string,
  ): Promise<AxiosResponse<VerificationList>> {
    return $api.put<VerificationList>(`/account/update`, {
      accountId,
      verifiedStatus,
    })
  }

  static async updateSystemTokens(
    data: ISaveTokenRequest[],
  ): Promise<AxiosResponse<VerificationList>> {
    return $api.post<VerificationList>(
      `/transaction/save-system-token-list`,
      data,
    )
  }

  static async getApiKey(): Promise<AxiosResponse<IApiKey>> {
    return $api.get<IApiKey>(`/setting/code/action.api.key`)
  }

  static async setApiKey(data: IApiKey): Promise<AxiosResponse> {
    return $api.put(`/setting`, data)
  }
}
