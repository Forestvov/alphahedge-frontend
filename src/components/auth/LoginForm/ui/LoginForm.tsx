import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import axios from 'axios'

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

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

  const onSubmit = async (data: ILoginRequest) => {
    setLoading(true)
    const body = JSON.stringify(data)
    clearErrors('isError')

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
    } catch (e) {
      setError(true)
      setValue('email', '')
      setValue('password', '')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Войдите в аккаунт!</h1>
      <FormProvider {...methods}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.row}>
            <div className={s.label}>E-mail</div>
            <Input
              className={s.input}
              placeholder="Введите e-mail"
              type="text"
              name="email"
            />
          </div>
          <div className={s.row}>
            <div className={s.label}>Пароль</div>
            <Input
              className={s.input}
              placeholder="Введите пароль"
              type="password"
              name="password"
            />
          </div>
          {error && (
            <div className={s.error}>Почта или пароль введены неверно</div>
          )}
          <Link className={s.link} to="/">
            Забыли пароль?
          </Link>
          <button className={s.submit} disabled={loading} type="submit">
            Войти
          </button>
        </form>
      </FormProvider>
      <div className={s.links}>
        <span>У вас нет аккаунта ?</span>
        <Link to="/register">Зарегестрироваться</Link>
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
