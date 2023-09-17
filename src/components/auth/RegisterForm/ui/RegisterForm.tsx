import axios from 'axios'
import { useState } from 'react'
import cn from 'classnames'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'

import { Input } from 'components/shared/Input'
import { DropDown, OptionType } from 'components/shared/DropDown'
import { IRegisterRequest } from 'models/request/AuthRequest'

import { registrationSchema } from '../lib/schema'

import s from './RegisterForm.module.scss'
import { API_URL } from '../../../../http'

export const RegisterForm = ({ isInvite }: { isInvite: boolean }) => {
  const [t] = useTranslation('authPage')
  const [f] = useTranslation('form')
  const [c] = useTranslation('country')
  const resolver = yupResolver(registrationSchema)

  const [loading, setLoading] = useState(false)

  const navigator = useNavigate()
  const params = useParams()

  const options: OptionType[] = c('country', {
    returnObjects: true,
    defaultValue: ['', ''],
  }).map((_country: string, idx: number) => ({
    label: _country,
    id: idx,
  }))

  const methods = useForm<IRegisterRequest>({
    resolver,
    defaultValues: {
      fam: '',
      password: '',
      im: '',
      userName: '',
      ot: '',
      email: '',
      phoneNumber: '',
      country: options[0].label,
    },
  })

  const { handleSubmit, setValue } = methods

  const onSubmit = async (data: IRegisterRequest) => {
    setLoading(true)
    const body = JSON.stringify(data)

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: isInvite
        ? `${API_URL}/auth/register/${params.code}`
        : `${API_URL}/auth/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    }

    try {
      await axios.request(config)
      localStorage.setItem('acceptEmail', data.email)
      await navigator('/verify')
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={s.wrapper}>
      <h1 className={cn(s.title, { [s.modif]: isInvite })}>
        {t('registerTitle')}
      </h1>
      {isInvite ? (
        <h2 className={s.sub}>
          {t('referal')} <span>{params.code}</span>
        </h2>
      ) : null}
      <FormProvider {...methods}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.row}>
            <div className={s.cell}>
              <div className={s.label}>{f('famLabel')}</div>
              <Input
                className={s.input}
                placeholder={f('famPlaceholder')}
                type="text"
                name="fam"
              />
            </div>

            <div className={s.cell}>
              <div className={s.label}>{f('imLabel')}</div>
              <Input
                className={s.input}
                placeholder={f('imPlaceholder')}
                type="text"
                name="im"
              />
            </div>

            <div className={s.cell}>
              <div className={s.label}>{f('otLabel')}</div>
              <Input
                className={s.input}
                placeholder={f('otPlaceholder')}
                type="text"
                name="ot"
              />
            </div>

            <div className={s.cell}>
              <div className={s.label}>{f('usernameLabel')}</div>
              <Input
                className={s.input}
                placeholder={f('usernamePlaceholder')}
                type="text"
                name="userName"
              />
            </div>

            <div className={s.cell}>
              <div className={s.label}>{f('phoneLabel')}</div>
              <Input
                className={s.input}
                placeholder={f('phonePlaceholder')}
                type="tel"
                name="phoneNumber"
              />
            </div>

            <div className={s.cell}>
              <div className={s.label}>E-mail</div>
              <Input
                className={s.input}
                placeholder={f('emailPlaceholder')}
                type="email"
                name="email"
              />
            </div>

            <div className={s.cell}>
              <div className={s.label}>{f('labelPassword')}</div>
              <Input
                className={s.input}
                placeholder={f('passwordPlaceholder')}
                type="password"
                name="password"
              />
            </div>

            <div className={s.cell}>
              <div className={s.label}>{f('cityLabel')}</div>
              <DropDown
                className={s.drop}
                placeholder={f('cityLabel')}
                options={options}
                onSelect={(value) => setValue('country', value)}
                defaultOption={options[0]}
              />
            </div>
          </div>
          <button className={s.submit} disabled={loading} type="submit">
            {t('reg')}
          </button>
        </form>
      </FormProvider>
      <div className={s.links}>
        <span>{t('haveAccount')}</span>
        <Link to="/login">{t('in')}</Link>
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
