import { useState } from 'react'
import { toast } from 'react-toastify'

import AdminService from 'services/AdminService'
import { FetchStatusType } from 'models/FetchStatusType'

import s from './UsersCarousel.module.scss'

const { sendPasswordToEmail } = AdminService

interface IUserSendPassword {
  email: string
}

export const UserSendPassword = ({ email }: IUserSendPassword) => {
  const [status, setStatus] = useState<FetchStatusType>()

  const notifySuccess = () => toast.success(`Логин/пароль успешно отправлен`)
  const notifyError = () => toast.error(`Что-то пошло не так, попробуйте позж`)

  const onClickHandler = async () => {
    setStatus('pending')
    await sendPasswordToEmail({ email })
      .then(() => {
        notifySuccess()
        setStatus('success')
      })
      .catch(() => {
        notifyError()
        setStatus('error')
      })
  }

  return (
    <button
      className={s.sendPassword}
      disabled={status === 'pending'}
      onClick={onClickHandler}
      type="button"
    >
      Отправить пароль
    </button>
  )
}
