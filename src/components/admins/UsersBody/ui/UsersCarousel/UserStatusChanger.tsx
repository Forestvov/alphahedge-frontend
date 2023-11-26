import cn from 'classnames'
import { useState } from 'react'
import { toast } from 'react-toastify'

import AdminService from 'services/AdminService'

import { StatusAccountType } from 'models/StatusAccountType'
import { FetchStatusType } from 'models/FetchStatusType'

import s from './UsersCarousel.module.scss'

interface IUserStatusChanger {
  accountId: number
  status: StatusAccountType
}

const { updateUserAccount } = AdminService

export const UserStatusChanger = (props: IUserStatusChanger) => {
  const { status, accountId } = props

  const [fetchStatus, setFetchStatus] = useState<FetchStatusType | null>()
  const [statusAccount, seStatusAccount] = useState<StatusAccountType>(status)

  const notifyError = () => toast.error('Ошибка, попробуйте позже')
  const notifySuccess = (text: string) => toast.success(`Данный юзер ${text}`)

  const toggleHandler = async () => {
    setFetchStatus('pending')
    try {
      await updateUserAccount({
        status: statusAccount === 'Enable' ? 'Disable' : 'Enable',
        accountId,
      })
      seStatusAccount(statusAccount === 'Enable' ? 'Disable' : 'Enable')
      notifySuccess(
        statusAccount === 'Enable' ? 'заблокирован' : 'разблокирован',
      )
      setFetchStatus('success')
    } catch (e) {
      console.log('Error update date')
      notifyError()
      setFetchStatus('error')
    }
  }

  return (
    <button
      className={cn(s.toggle, { [s.active]: statusAccount === 'Enable' })}
      type="button"
      onClick={toggleHandler}
      disabled={fetchStatus === 'pending'}
    >
      <div className={s.overlay} />
    </button>
  )
}
