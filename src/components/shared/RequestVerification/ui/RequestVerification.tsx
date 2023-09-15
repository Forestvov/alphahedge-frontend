import { Link } from 'react-router-dom'

import { PersonalBlock } from 'components/shared/PersonalBlock'

import s from './RequestVerification.module.scss'

export const RequestVerification = () => (
  <PersonalBlock label="Верификация">
    <h1 className={s.title}>
      Пожалуйста, пройдите верификация на странице{' '}
      <Link to="/personal">Профиля</Link>
    </h1>
  </PersonalBlock>
)
