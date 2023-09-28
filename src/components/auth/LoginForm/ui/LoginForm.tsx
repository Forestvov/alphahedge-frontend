import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

import useBalance from 'hooks/context/useBalance'
import useProfile from 'hooks/context/useProfile'

import AccountServices from 'services/AccountServices'

import { Input } from 'components/shared/Input'

import { ILoginRequest } from 'models/request/AuthRequest'
import { IAuthResponse } from 'models/response/AuthResponse'

import { API_URL } from '../../../../http'

import s from './LoginForm.module.scss'

const { getProfile, getBalance } = AccountServices

export const LoginForm = () => {
  const [a] = useTranslation('authPage')
  const [f] = useTranslation('form')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<'errorLogin' | 'errorAuth' | null>(null)

  const navigate = useNavigate()

  const { setPayload } = useProfile()
  const { setCash } = useBalance()

  const methods = useForm<ILoginRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit, clearErrors, setValue } = methods

  const resendMail = async (email: string) => {
    const config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${API_URL}/auth/send-verify/${email}`,
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true,
      },
    }

    try {
      await axios.request<IAuthResponse>(config)
      localStorage.setItem('acceptEmail', email)
      await navigate('/verify')
    } catch (e: any) {
      console.log('e')
    }
  }

  const onSubmit = async (data: ILoginRequest) => {
    setLoading(true)
    const body = JSON.stringify(data)
    clearErrors('isError')

    if (error === 'errorAuth') {
      try {
        await resendMail(data.email)
      } catch (e) {
        console.log('e')
      }
      return
    }

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API_URL}/auth/authenticate`,
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true,
      },
      data: body,
    }

    try {
      const response = await axios.request<IAuthResponse>(config)

      localStorage.setItem('token', response.data.acceptToken)
      localStorage.setItem('refresh', response.data.refreshToken)

      const resProfile = await getProfile()
      const resBalance = await getBalance()
      setPayload({
        loading: false,
        isAuth: true,
        profile: resProfile.data,
      })
      setCash({
        balance: resBalance.data,
      })
      localStorage.setItem('user-type', resProfile.data.role)

      if (resProfile.data.role === 'User') {
        await navigate('/personal/dashboard')
      } else {
        await navigate('/admin/dashboard')
      }
      setError(null)
    } catch (e: any) {
      if (e?.response?.data.message === 'Not verified') {
        setError('errorAuth')
      } else {
        setError('errorLogin')
        setValue('email', '')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>{a('titleLogin')}</h1>
      <FormProvider {...methods}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.row}>
            <div className={s.label}>E-mail</div>
            <Input
              className={s.input}
              placeholder={f('emailPlaceholder')}
              type="text"
              name="email"
            />
          </div>
          <div className={s.row}>
            <div className={s.label}>{f('labelPassword')}</div>
            <Input
              className={s.input}
              placeholder={f('passwordPlaceholder')}
              type="password"
              name="password"
            />
          </div>
          {error && <div className={s.error}>{a(error)}</div>}
          <Link className={s.link} to="/recovery">
            {a('recovery')}
          </Link>
          {error === 'errorAuth' ? (
            <button className={s.submit} disabled={loading} type="submit">
              {a('verification')}
            </button>
          ) : (
            <button className={s.submit} disabled={loading} type="submit">
              {a('in')}
            </button>
          )}
        </form>
      </FormProvider>
      <div className={s.links}>
        <span>{a('haveAccount')}</span>
        <Link to="/register">{a('reg')}</Link>
      </div>
      <div className={s.copyright}>
        The activities of are conducted within the obtained permits and are in
        full compliance with the obtained certificates.
        <br />
        Copyright © 2023, Alphahedge Holdings Ltd
      </div>
    </div>
  )
}
