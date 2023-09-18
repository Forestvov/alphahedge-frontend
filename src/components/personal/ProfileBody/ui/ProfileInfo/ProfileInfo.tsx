import { useTranslation } from 'react-i18next'

import { VerificationIcon } from 'assets/icons'

import { ProfileVerification } from '../ProfileVerification/ProfileVerification'

import { ProfileAccordion } from '../ProfileAccordion/ProfileAccordion'

import s from './ProfileInfo.module.scss'

interface IProfileAccordion {
  label: string
  value: string
}

export const ProfileInfo = ({ status }: { status: string }) => {
  const [p] = useTranslation('panel')

  return (
    <>
      <h3 className={s.title}>{p('verify_title')}</h3>
      <div className={s.verification}>
        <img src={VerificationIcon} alt="verification" />
        <div className={s.verification__info}>
          <div className={s.verification__title}>KYC</div>
          <div className={s.verification__id}>ID Information</div>
        </div>
      </div>

      <div className={s.inner}>
        <div className={s.left}>
          <ProfileVerification status={status} />
        </div>
        <div className={s.right}>
          {p('accordions', { returnObjects: true, defaultValue: ['', ''] }).map(
            (accordion: IProfileAccordion, key: number) => (
              <ProfileAccordion
                value={accordion.value}
                label={accordion.label}
                key={key}
              />
            ),
          )}
        </div>
      </div>
    </>
  )
}
