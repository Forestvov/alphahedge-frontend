import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { FormProvider, useForm } from 'react-hook-form'
import cn from 'classnames'

import AdminService from 'services/AdminService'
import { IApiKey } from 'models/request/AccountRequest'

import { Button } from 'components/shared/Button'
import { Input } from 'components/shared/Input'

import s from './SystemTokens.module.scss'

const { getApiKey, setApiKey } = AdminService

export const ApiKeys = () => {
  const [f] = useTranslation('form')
  const [p] = useTranslation('panel')
  const [n] = useTranslation('notification')

  const notifySuccess = () => toast.success(n('updateProfile'))

  const methods = useForm<any>({
    defaultValues: {},
    mode: 'onChange',
  })

  const { handleSubmit, setValue } = methods

  const fetchApiKey = async () => {
    try {
      const response = await getApiKey()
      setValue('key', response.data.settingValue)
    } catch (e) {
      console.log('Error fetch profile tokens', e)
    }
  }

  useEffect(() => {
    fetchApiKey()
  }, [])

  const onSubmit = async (data: any) => {
    try {
      const body: IApiKey = {
        settingValue: data.key,
        settingCode: 'action.api.key',
      }
      await setApiKey(body)
      notifySuccess()
    } catch (e) {
      console.log('Error update', e)
    }
  }

  return (
    <FormProvider {...methods}>
      <form className={cn(s.form, s.mb)} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.header}>
          <h2 className={s.title}>{p('titleApiKey')}</h2>
          <Button className={s.button} type="submit">
            {f('save')}
          </Button>
        </div>
        <div className={s.cell}>
          <Input placeholder={p('placeholderApiKey')} type="text" name="key" />
          <p className={s.label}>{p('placeholderApiKey')}</p>
        </div>
      </form>
    </FormProvider>
  )
}
