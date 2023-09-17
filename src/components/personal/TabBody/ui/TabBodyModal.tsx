import { useEffect, useState } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import { Modal } from 'components/shared/Modal'

import { FetchStatusType } from 'models/FetchStatusType'

import AccountServices from 'services/AccountServices'

import s from './TabBody.module.scss'

const { settingProfile } = AccountServices

interface ITabBodyModal {
  payload: FetchStatusType | null
}

export const TabBodyModal = ({ payload }: ITabBodyModal) => {
  const [status, setStatus] = useState<FetchStatusType | null>(null)

  const [n] = useTranslation('notification')
  const [c] = useTranslation('common')
  const [f] = useTranslation('form')
  const [p] = useTranslation('panel')

  useEffect(() => {
    setStatus(payload)
  }, [payload])

  const sendRequestHandler = async () => {
    setStatus('pending')
    try {
      await settingProfile({
        profileSettingsCode: 'indiservice',
        value: new Date(),
      })
      await setStatus('success')
    } catch (e) {
      setStatus('error')
      console.log('Error send setting', e)
    }
  }

  return (
    <Modal
      classNameButton={cn(s.tab, s.individual, s.disable)}
      textButton={`<svg width='9' height='12' viewBox='0 0 9 12' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M7.4375 4.5625H7.08333V3.125C7.08333 1.53939 5.81263 0.25 4.25 0.25C2.68737 0.25 1.41667 1.53939 1.41667 3.125V4.5625H1.0625C0.476952 4.5625 0 5.04593 0 5.64062V10.6719C0 11.2666 0.476952 11.75 1.0625 11.75H7.4375C8.02305 11.75 8.5 11.2666 8.5 10.6719V5.64062C8.5 5.04593 8.02305 4.5625 7.4375 4.5625ZM2.36114 3.125C2.36114 2.06792 3.20826 1.20836 4.25 1.20836C5.29174 1.20836 6.13886 2.06794 6.13886 3.125V4.5625H2.36114V3.125Z' fill='#818181'/></svg> индивидуальные введения`}
    >
      <div className={s.modal}>
        <div className={s.title}>{p('openVis')}</div>
        <p className={s.text}>
          {status === 'success'
            ? n('successRequestAdvanced')
            : n('textRequestAdvanced')}
        </p>
        <div className={s.time}>{c('waitRequestTen')}</div>
        {status !== 'success' && (
          <button
            className={s.button}
            onClick={sendRequestHandler}
            disabled={status === 'pending'}
            type="button"
          >
            {f('sendRequest')}
          </button>
        )}
      </div>
    </Modal>
  )
}
