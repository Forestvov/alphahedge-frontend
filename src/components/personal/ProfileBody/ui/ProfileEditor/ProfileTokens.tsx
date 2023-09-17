import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getDirtyValues } from 'helpers/getDirtyValues'
import { useTranslation } from 'react-i18next'

import AccountServices from 'services/AccountServices'
import { ISaveTokenRequest } from 'models/request/AccountRequest'

import { Loader } from 'components/shared/Loader'
import { Button } from 'components/shared/Button'
import { Input } from 'components/shared/Input'

import { IProfileToken } from 'models/response/AccountResponse'

import s from './ProfileEditor.module.scss'

const { saveTokens, getProfileTokens } = AccountServices

export const ProfileTokens = () => {
  const [f] = useTranslation('form')
  const [p] = useTranslation('panel')
  const [n] = useTranslation('notification')

  // const resolver = yupResolver(updateProfileSchema)

  const [fields, setFields] = useState<IProfileToken[]>()

  const notifySuccess = () => toast.success(n('updateProfile'))

  const methods = useForm<any>({
    defaultValues: {},
    mode: 'onChange',
  })

  const {
    handleSubmit,
    setValue,
    formState: { dirtyFields },
  } = methods

  const fetchTokens = async () => {
    try {
      const response = await getProfileTokens()
      setFields(response.data)
      response.data.map((field) =>
        setValue(field.currentTypeId.toString(), field.value),
      )
    } catch (e) {
      console.log('Error fetch profile tokens', e)
    }
  }

  useEffect(() => {
    fetchTokens()
  }, [])

  const onSubmit = async (data: any) => {
    if (fields) {
      const body = getDirtyValues(dirtyFields, data)

      const formatBody: ISaveTokenRequest[] = Object.keys(body).map((key) => ({
        // @ts-ignore
        value: body[key],
        currentTypeId: key,
      }))

      try {
        await saveTokens(formatBody)
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
              <div className={s.cell} key={idx}>
                <Input
                  placeholder={field.currencyToken}
                  type="text"
                  name={field.currentTypeId.toString()}
                />
                <p className={s.label}>{field.currencyToken}</p>
              </div>
            ))}
          </div>
        )}
      </form>
    </FormProvider>
  )
}
