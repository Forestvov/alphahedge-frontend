/* eslint-disable */
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FormProvider, useForm } from 'react-hook-form'

import AdminService from 'services/AdminService'
import TransactionServices from 'services/TransactionServices'

import { IToken } from 'models/IToken'

import { Button } from 'components/shared/Button'
import { Loader } from 'components/shared/Loader'
import { Input } from 'components/shared/Input'

import { SystemQr } from './SystemQr'

import s from './SystemTokens.module.scss'

const { getTokens } = TransactionServices
const { updateSystemTokens } = AdminService

export const SystemTokens = () => {
  const [f] = useTranslation('form')
  const [p] = useTranslation('panel')
  const [n] = useTranslation('notification')

  const [fields, setFields] = useState<IToken[]>()

  const notifySuccess = () => toast.success(n('updateProfile'))

  const methods = useForm<any>({
    defaultValues: {},
    mode: 'onChange',
  })

  const { handleSubmit, setValue } = methods

  const fetchTokens = async () => {
    try {
      const response = await getTokens()
      setFields(response.data)
      response.data.map((field) => {
        setValue(field.currencyTypeId.toString(), field.value)
        setValue(`qrCode_${field.currencyTypeId}`, {
          image: field.qrCode,
        })
      })
    } catch (e) {
      console.log('Error fetch profile tokens', e)
    }
  }

  useEffect(() => {
    fetchTokens()
  }, [])

  const onSubmit = async (data: any) => {
    if (fields) {
      const body = Object.keys(data)
        .map((key) => ({
          value: data[key],
          currencyTypeId: key,
          qrCode: data[`qrCode_${key}`]?.image,
        }))
        .filter((item) => !item.currencyTypeId.includes('qrCode_'))

      try {
        await updateSystemTokens(body)
        await fetchTokens()
        notifySuccess()
      } catch (e) {
        console.log('Error update', e)
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.header}>
          <h2 className={s.title}>{p('titleTokens')}</h2>
          <Button className={s.button} type="submit">
            {f('save')}
          </Button>
        </div>
        {!fields ? (
          <div className={s.loader}>
            <Loader />
          </div>
        ) : (
          <div className={s.inputs}>
            {fields.map((field, idx) => (
              <div className={s.cell} key={field.currencyTypeId}>
                <Input
                  placeholder={field.currencyToken}
                  type="text"
                  name={field.currencyTypeId.toString()}
                />
                <p className={s.label}>{field.currencyToken}</p>

                {field.qrCode && (
                  <img className={s.image} src={field.qrCode} alt="qrCode" />
                )}

                <SystemQr id={field.currencyTypeId} />
              </div>
            ))}
          </div>
        )}
      </form>
    </FormProvider>
  )
}
