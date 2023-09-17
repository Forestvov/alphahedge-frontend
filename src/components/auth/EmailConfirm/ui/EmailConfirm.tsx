import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

import { IAuthResponse } from 'models/response/AuthResponse'

import { API_URL } from '../../../../http'

import s from './EmailConfirm.module.scss'

export const EmailConfirm = () => {
  const [a] = useTranslation('authPage')

  const [loader, setLoader] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorConfirm, setErrorConfirm] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  const resendMail = async () => {
    setLoader(true)
    setSuccess(false)
    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${API_URL}/auth/send-verify/${localStorage.getItem('acceptEmail')}`,
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true,
      },
    }

    try {
      await axios.request<IAuthResponse>(config)
      setSuccess(true)
    } catch {
      console.log('')
    } finally {
      setLoader(false)
    }
  }

  const verifyEmail = async () => {
    try {
      const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${API_URL}/auth/verify/${id}`,
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true,
        },
      }
      await axios.request<IAuthResponse>(config)
    } catch (e) {
      setErrorConfirm(true)
      console.log(e)
    }
  }

  useEffect(() => {
    if (id) {
      verifyEmail()
    }
  }, [])

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>
        {errorConfirm ? a('isConfirmEmail') : a('isNotConfirmEmail')}
      </h1>
      {errorConfirm ? (
        <p className={s.text}>{a('isConfirmEmailText')}</p>
      ) : (
        <p className={s.text}>{a('isNotConfirmEmailText')}</p>
      )}
      <div className={s.links}>
        <span className={s.email}>{localStorage.getItem('acceptEmail')}</span>
      </div>
      {!errorConfirm ? (
        <button
          className={s.submit}
          disabled={loader || success}
          onClick={resendMail}
          type="button"
        >
          {a('repeat')}
        </button>
      ) : (
        <button
          className={s.submit}
          disabled={loader || success}
          onClick={() => navigate('/login')}
          type="button"
        >
          {a('auth')}
        </button>
      )}
      {success && <div className={s.description}>{a('isSendEmail')}</div>}
      {!errorConfirm && (
        <button className={s.after} onClick={() => navigate('/')} type="button">
          {a('after')})
        </button>
      )}
    </div>
  )
}
