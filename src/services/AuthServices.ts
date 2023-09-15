import { IAuthResponse } from 'models/response/AuthResponse'
import $api, { API_URL } from '../http'


export default class AuthServices {
  static async checkAuth() {
    try {
      const response = await $api.put<IAuthResponse>(`${API_URL}/auth/token`)
      localStorage.setItem('token', response?.data?.acceptToken)
    } catch (e) {
      console.log(e)
    }
  }
}
