import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'

import { Input } from 'components/shared/Input'
import { IAuthResponse } from 'models/response/AuthResponse'

import { API_URL } from '../../../../http'
import { RecoveryEmail, RecoveryPassword } from '../lib/schema'

import s from './RecoveryForm.module.scss'

interface IFields {
  email: string
  password?: string
  repeat_password?: string
}

export const RecoveryForm = ({ checkToken }: { checkToken: boolean }) => {
  const [t] = useTranslation('authPage')
  const [f] = useTranslation('form')
  const [n] = useTranslation('notification')

  const [loading, setLoading] = useState(false)

  const navigator = useNavigate()

  // @ts-ignore
  const resolver = yupResolver(checkToken ? RecoveryPassword : RecoveryEmail)

  const { code } = useParams()

  // @ts-ignore
  const methods = useForm<IFields>({ resolver })

  const { handleSubmit, setValue, reset } = methods

  const notifyError = () => toast.error(n('errorMessage'))
  const notifySuccess = (text: string) => toast.success(text)

  const onSubmit = async (data: IFields) => {
    setLoading(true)

    let config

    if (checkToken && code) {
      config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${API_URL}/auth/restore/${data.password}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: code,
          withCredentials: true,
        },
      }
    } else {
      config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${API_URL}/auth/restore/send/${data.email}`,
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true,
        },
      }
    }

    try {
      await axios.request<IAuthResponse>(config)
      notifySuccess(
        checkToken && code ? t('changePassword') : t('sendLinkFromEmail'),
      )

      if (checkToken && code) {
        navigator('/login')
      }
    } catch (e) {
      setValue('email', '')
      notifyError()
    } finally {
      setLoading(false)
      reset()
    }
  }

  if (checkToken && code) {
    return (
      <div className={s.wrapper}>
        <h1 className={s.title}>{t('recoveryTitle')}</h1>
        <FormProvider {...methods}>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.row}>
              <div className={s.label}>{f('labelPassword')}</div>
              <Input
                className={s.input}
                placeholder={f('passwordPlaceholder')}
                type="password"
                name="password"
              />
            </div>
            <div className={s.row}>
              <div className={s.label}>{t('repeatPassowrd')}</div>
              <Input
                className={s.input}
                placeholder={t('repeatPassowrd')}
                type="password"
                name="repeat_password"
              />
            </div>
            <button className={s.submit} disabled={loading} type="submit">
              {t('rec')}
            </button>
          </form>
        </FormProvider>
        <div className={s.links}>
          <span>{t('notHaveAccount')}</span>
          <Link to="/register">{t('reg')}</Link>
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

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>{t('recoveryTitle')}</h1>
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
          <button className={s.submit} disabled={loading} type="submit">
            {t('rec')}
          </button>
        </form>
      </FormProvider>
      <div className={s.links}>
        <span>{t('notHaveAccount')}</span>
        <Link to="/register">{t('reg')}</Link>
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
