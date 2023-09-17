import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { PersonalBlock } from 'components/shared/PersonalBlock'

import s from './RequestVerification.module.scss'

export const RequestVerification = () => {
  const [p] = useTranslation('panel')

  return (
    <PersonalBlock label={p('verify_title')}>
      <h1 className={s.title}>
        {p('disable')} <Link to="/personal">{p('disablePage')}</Link>
      </h1>
    </PersonalBlock>
  )
}
