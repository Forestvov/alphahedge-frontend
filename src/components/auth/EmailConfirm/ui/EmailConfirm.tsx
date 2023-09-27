import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'

import { Input } from 'components/shared/Input'

import { IAuthResponse } from 'models/response/AuthResponse'

import { API_URL } from '../../../../http'

import s from './EmailConfirm.module.scss'

export const EmailConfirm = () => {
  const [a] = useTranslation('authPage')

  const [loader, setLoader] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successConfirm, setSuccessConfirm] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()

  const methods = useForm()

  const resendMail = async (email: string) => {
    setLoader(true)
    setSuccess(false)
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
      setSuccess(true)
    } catch (e: any) {
      if (e.message === 'Request failed with status code 403') {
        setSuccess(true)
      }
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
      console.log(e)
    } finally {
      setSuccessConfirm(true)
    }
  }

  const currentEmail = localStorage.getItem('acceptEmail')

  useEffect(() => {
    if (id) {
      verifyEmail()
    }
  }, [id])

  const onSubmit = (data: any) => {
    if (!currentEmail) {
      if (data.email.length) {
        resendMail(data.email)
      }
    } else {
      resendMail(currentEmail)
    }
  }

  return (
    <FormProvider {...methods}>
      <form className={s.wrapper} onSubmit={methods.handleSubmit(onSubmit)}>
        <h1 className={s.title}>
          {successConfirm ? a('isConfirmEmail') : a('isNotConfirmEmail')}
        </h1>
        {successConfirm ? (
          <p className={s.text}>{a('isConfirmEmailText')}</p>
        ) : (
          <p className={s.text}>{a('isNotConfirmEmailText')}</p>
        )}
        {!successConfirm && (
          <div className={s.links}>
            {currentEmail ? (
              <span className={s.email}>
                {localStorage.getItem('acceptEmail')}
              </span>
            ) : (
              <Input
                placeholder={a('repeatEmail')}
                disabled={success}
                type="email"
                name="email"
              />
            )}
          </div>
        )}
        {!successConfirm ? (
          <button
            className={s.submit}
            disabled={loader || success}
            type="submit"
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
        {!successConfirm && (
          <button
            className={s.after}
            onClick={() => navigate('/')}
            type="button"
          >
            {a('after')}
          </button>
        )}
      </form>
    </FormProvider>
  )
}
