import cn from 'classnames'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import AdminService from 'services/AdminService'

import useProfile from 'hooks/context/useProfile'

import { Modal } from 'components/shared/Modal'

import { FetchStatusType } from 'models/FetchStatusType'

import BriefcaseServices from 'services/BriefcaseServices'

import s from './IndividualCard.module.scss'

interface IIndividualCardModal {
  briefcaseId: number
  isDisable: boolean
  update?: () => void
}

const { closeBriefcase } = BriefcaseServices
const { closeBrief } = AdminService

export const IndividualCardModal = (props: IIndividualCardModal) => {
  const { isDisable, briefcaseId, update = () => null } = props

  const [p] = useTranslation('panel')
  const [n] = useTranslation('notification')

  const { payload } = useProfile()

  const [status, setStatus] = useState<FetchStatusType | null>(null)

  const notifyError = () => toast.error(n('errorMessage'))
  const notifySuccess = () => toast.success(n('changeStatus'))

  const sendRequestHandler = async () => {
    setStatus('pending')
    try {
      await closeBriefcase(briefcaseId)
      await setStatus('success')
    } catch (e) {
      setStatus('error')
      console.log('Error send setting', e)
    }
  }

  const onCloseBrief = async () => {
    setStatus('pending')
    try {
      await closeBrief(briefcaseId)
      await setStatus('success')
      await update()
      notifySuccess()
    } catch (e) {
      setStatus('error')
      notifyError()
      console.log('Error send setting', e)
    }
  }

  return payload.profile?.role === 'Admin' ? (
    <button
      className={s.open}
      disabled={status === 'pending'}
      onClick={onCloseBrief}
      type="button"
    >
      {p('close')}
    </button>
  ) : (
    <Modal
      classNameButton={cn(s.open, { [s.isDisable]: isDisable })}
      textButton={p('close')}
    >
      <div className={s.modal}>
        <div className={s.title}>{p('closeBrief')}</div>
        <p className={s.text}>
          {status === 'success' ? p('successVerify') : p('veitVerify')}
        </p>
        <div className={s.time}>{p('verifyTime')}</div>
        {status !== 'success' && (
          <button
            className={s.send}
            onClick={sendRequestHandler}
            disabled={status === 'pending'}
            type="button"
          >
            {p('sendRequest')}
          </button>
        )}
      </div>
    </Modal>
  )
}
