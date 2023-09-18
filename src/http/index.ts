/* eslint-disable */
import axios from 'axios'

export const API_URL = process.env.REACT_APP_SERVER

const $api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `${localStorage.getItem('token')}`
  const accountId = localStorage.getItem('Account-Id')
  const isEditor = localStorage.getItem('editor') === '1'

  if (accountId && isEditor) {
    config.headers['Account-Id'] = `${localStorage.getItem('Account-Id')}`
  }
  return config
})

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 403 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const config = {
          method: 'PUT',
          maxBodyLength: Infinity,
          url: `${API_URL}/auth/token`,
          headers: {
            'Content-Type': 'application/json',
            withCredentials: true,
            Authorization: localStorage.getItem('refresh'),
          },
        }
        const response = await axios.request<any>(config)
        localStorage.setItem('token', response.data.acceptToken)
        localStorage.setItem('refresh', response.data.refreshToken)
        return $api.request(originalRequest)
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН')
      }
    }
    throw error
  },
)

export default $api
