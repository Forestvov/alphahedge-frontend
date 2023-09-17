import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getDirtyValues } from 'helpers/getDirtyValues'
import { useTranslation } from 'react-i18next'

import AccountServices from 'services/AccountServices'
import { Button } from 'components/shared/Button'
import { Input } from 'components/shared/Input'
import { IProfileField } from 'models/response/AccountResponse'

import s from './ProfileEditor.module.scss'

const { updateProfile } = AccountServices

export const ProfileEditor = (props: IProfileField) => {
  const [f] = useTranslation('form')
  const [p] = useTranslation('panel')
  const [n] = useTranslation('notification')

  const { fam, im, userName, email, phoneNumber, country } = props

  // const resolver = yupResolver(updateProfileSchema)

  const notifySuccess = () => toast.success(n('updateProfile'))

  const methods = useForm<IProfileField>({
    defaultValues: {
      fam,
      email,
      im,
      userName,
      phoneNumber,
      country,
    },
    mode: 'onChange',
  })
  const {
    handleSubmit,
    formState: { dirtyFields },
  } = methods

  const onSubmit = async (data: IProfileField) => {
    const body = getDirtyValues(dirtyFields, data)

    try {
      await updateProfile(body as IProfileField)
      notifySuccess()
    } catch (e) {
      console.log('Error update', e)
    }
  }

  return (
    <FormProvider {...methods}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.header}>
          <h2 className={s.title}>{p('titlePersonal')}</h2>
          <Button className={s.button} type="submit">
            {f('save')}
          </Button>
        </div>
        <div className={s.inputs}>
          <div className={s.cell}>
            <Input placeholder={f('famLabel')} type="text" name="fam" />
            <p className={s.label}>{f('famLabel')}</p>
          </div>
          <div className={s.cell}>
            <Input placeholder={f('imLabel')} type="text" name="im" />
            <p className={s.label}>{f('imLabel')}</p>
          </div>
          <div className={s.cell}>
            <Input
              placeholder="User name"
              disabled
              type="text"
              name="userName"
            />
            <p className={s.label}>USERNAME</p>
          </div>
          <div className={s.cell}>
            <Input
              placeholder={f('phoneLabel')}
              type="tel"
              name="phoneNumber"
            />
            <p className={s.label}>{f('phoneLabel')}</p>
          </div>
          <div className={s.cell}>
            <Input placeholder="E-mail" disabled type="email" name="email" />
            <p className={s.label}>E-mail</p>
          </div>
          <div className={s.cell}>
            <Input placeholder="Страна" type="text" name="country" />
            <p className={s.label}>Страна</p>
          </div>
          <div className={s.cell}>
            <Input
              placeholder={f('oldPass')}
              type="password"
              name="oldPassword"
            />
            <p className={s.label}>{f('oldPass')}</p>
          </div>
          <div className={s.cell}>
            <Input
              placeholder={f('newPassPlaceholder')}
              type="password"
              name="newPassword"
            />
            <p className={s.label}>{f('newPassMinChar')}</p>
          </div>
          <div className={s.cell}>
            <Input
              placeholder={f('confirmPass')}
              type="password"
              name="repeat_password"
            />
            <p className={s.label}>{f('confirmPass')}</p>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
