import { useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import cn from 'classnames'

import { Price } from 'components/shared/Price'

import { IReferalHeader } from '../model/Referal.interface'

import s from './Referral.module.scss'

export const ReferralHeader = (props: IReferalHeader) => {
  const { referal, total, count } = props

  const { t } = useTranslation('panel')

  const [isCopy, setIsCopy] = useState(false)

  const notifySuccess = () => toast.success(t('linkCoped'))

  const copyHandler = (text: string) => {
    navigator.clipboard.writeText(text)
    setIsCopy(true)
    notifySuccess()
  }

  return (
    <div className={s.header}>
      <div className={s.col}>
        <div className={s.value}>
          <Price type="xs" price={total ?? 0} />
        </div>
        <div className={s.label}>{t('referalTotal')}</div>
      </div>
      <div className={s.col}>
        <div className={s.value}>{count}</div>
        <div className={s.label}>{t('referalAmount')}</div>
      </div>
      <div className={cn(s.col, s.ref)}>
        <div className={s.value}>
          <span>{referal}</span>
          <button
            className={isCopy ? s.coped : ''}
            onClick={() => copyHandler(`${referal}`)}
            type="button"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.0015 27.1875H9.5581C7.80111 27.1875 6.37207 25.7584 6.37207 24.0015V9.5581C6.37207 7.80111 7.80111 6.37207 9.5581 6.37207H24.0015C25.7584 6.37207 27.1875 7.80111 27.1875 9.5581V24.0015C27.1875 25.7584 25.7584 27.1875 24.0015 27.1875ZM9.5581 8.49609C8.97251 8.49609 8.49609 8.97251 8.49609 9.5581V24.0015C8.49609 24.587 8.97251 25.0635 9.5581 25.0635H24.0015C24.587 25.0635 25.0635 24.587 25.0635 24.0015V9.5581C25.0635 8.97251 24.587 8.49609 24.0015 8.49609H9.5581ZM4.24804 18.6914H3.18603C2.60044 18.6914 2.12402 18.215 2.12402 17.6294V3.18603C2.12402 2.60044 2.60044 2.12402 3.18603 2.12402H17.6294C18.215 2.12402 18.6914 2.60044 18.6914 3.18603V4.19494H20.8154V3.18603C20.8154 1.42904 19.3864 0 17.6294 0H3.18603C1.42904 0 0 1.42904 0 3.18603V17.6294C0 19.3864 1.42904 20.8154 3.18603 20.8154H4.24804V18.6914Z"
                fill="#7F7F7F"
              />
            </svg>
          </button>
        </div>
        <div className={s.label}>{t('referalLink')}</div>
      </div>
    </div>
  )
}
