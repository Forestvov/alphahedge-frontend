import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import { PersonalCardIcon, PhoneIcon, SuccessIcon } from 'assets/icons'

import { VerificationEnum } from 'models/VerificationEnum'

import { ProfileVerificationModal } from './ProfileVerificationModal'

import s from './ProfileVerification.module.scss'

export const ProfileVerification = ({ status }: { status: string }) => {
  const [p] = useTranslation('panel')

  return (
    <div className={s.verification}>
      <div className={s.icons}>
        <div className={cn(s.icon, s.current)}>
          <img src={PersonalCardIcon} alt="not_started" />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="22"
          viewBox="0 0 13 22"
          fill="none"
        >
          <path
            d="M1 1.5L11 11L1 20.5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <div
          className={cn(s.icon, {
            [s.current]:
              status === VerificationEnum.PENDING ||
              status === VerificationEnum.SUCCESS,
          })}
        >
          <img src={PhoneIcon} alt="pending" />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="22"
          viewBox="0 0 13 22"
          fill="none"
        >
          <path
            d="M1 1.5L11 11L1 20.5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={
              status === VerificationEnum.PENDING ||
              status === VerificationEnum.SUCCESS
                ? 1
                : '0.2'
            }
          />
        </svg>
        <div
          className={cn(s.icon, {
            [s.current]: status === VerificationEnum.SUCCESS,
          })}
        >
          <img src={SuccessIcon} alt="success" />
        </div>
      </div>

      <div className={s.info}>
        <div className={s.info__title}>
          {p('statusTitle')} :
          <span
            className={cn(
              s.status,
              { [s.pending]: status === VerificationEnum.PENDING },
              { [s.success]: status === VerificationEnum.SUCCESS },
              { [s.cancel]: status === VerificationEnum.NOT_STARTED },
            )}
          >
            {status === VerificationEnum.NOT_STARTED && p('Verify_NOT_STARTED')}
            {status === VerificationEnum.PENDING && p('Verify_PENDING')}
            {status === VerificationEnum.SUCCESS && p('Verify_SUCCESS')}
          </span>
        </div>
        <div className={s.info__text}>{p('verify_text')}</div>
      </div>
      {status === VerificationEnum.NOT_STARTED && <ProfileVerificationModal />}
    </div>
  )
}
