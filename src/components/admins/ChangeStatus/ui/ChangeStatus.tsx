import { useRef, useState } from 'react'
import cn from 'classnames'
import { toast } from 'react-toastify'

import { StatusCloseEnum } from 'models/StatusCloseEnum'

import { useOnOutsideClick } from 'hooks/useOnOutsideClick'

import { IChangeStatus } from '../model/ChangeStatus.interface'

import s from './ChangeStatus.module.scss'

export const ChangeStatus = (props: IChangeStatus) => {
  const {
    status,
    successKey,
    processKey,
    cancelKey,
    notVerifiedYC,
    notVerifiedEmail,
    id,
    updateData,
    changeStatus,
  } = props

  const [isOpen, setOpen] = useState(false)

  const ref = useRef<any>(null)

  useOnOutsideClick(ref, () => setOpen(false))

  const toggleDropdown = () => {
    if (status === StatusCloseEnum['В обработке']) {
      setOpen((prevState) => !prevState)
    }
  }

  const notifyError = () => toast.error('Произошла ошибка, попробуйте позже')
  const notifySuccess = () => toast.success('Статус был изменен')

  const changeStatusHandler = async (_status: string) => {
    try {
      await changeStatus(id, _status)
      await updateData()
      notifySuccess()
    } catch (e) {
      notifyError()
      console.log('Error update order')
    } finally {
      setOpen(false)
    }
  }

  return (
    <div className={s.status} ref={ref}>
      <button
        className={cn(
          s.button,
          { [s.pending]: status === processKey },
          { [s.success]: status === successKey },
          { [s.cancel]: status === cancelKey },
        )}
        type="button"
        onClick={() => toggleDropdown()}
      >
        {status === successKey && 'Успешно'}
        {status === processKey && 'В обработке'}
        {status === cancelKey && 'Отменен'}
        {status === notVerifiedYC && 'Нет запроса'}
        {status === notVerifiedEmail && 'Нет запроса'}

        {status === processKey && (
          <svg
            className={cn(s.arrow, { [s.active]: isOpen })}
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="10"
            viewBox="0 0 15 10"
            fill="none"
          >
            <path
              d="M1 1.25L7.5 7.75L14 1.25"
              stroke="#DEBB00"
              strokeWidth="2"
            />
          </svg>
        )}
      </button>

      <div className={cn(s.list, 'change-status', { [s.open]: isOpen })}>
        <button
          className={s.success}
          onClick={() => changeStatusHandler(successKey)}
          type="button"
        >
          Успешно
        </button>
        <button
          className={s.cancel}
          onClick={() => changeStatusHandler(cancelKey)}
          type="button"
        >
          Отменен
        </button>
      </div>
    </div>
  )
}
