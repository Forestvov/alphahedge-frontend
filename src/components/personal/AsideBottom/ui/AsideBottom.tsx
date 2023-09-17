import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ExitIcon, HelpIcon } from 'assets/icons'
import useProfile from 'hooks/context/useProfile'

import s from './AsideBottom.module.scss'

export const AsideBottom = () => {
  const [t] = useTranslation('personalNavigation')

  const navigator = useNavigate()

  const { setPayload } = useProfile()

  const logoutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('Account-Id')
    localStorage.removeItem('editor')
    localStorage.removeItem('user-type')

    navigator('/')
    setPayload({ isAuth: false, loading: false })
  }

  return (
    <div className={s.bottom}>
      <NavLink to="/help">
        <div className={s.icon}>
          <img src={HelpIcon} alt={t('help')} />
        </div>
        <span>{t('help')}</span>
      </NavLink>
      <button type="button" onClick={logoutHandler}>
        <div className={s.icon}>
          <img src={ExitIcon} alt={t('exit')} />
        </div>
        <span>{t('exit')}</span>
      </button>
    </div>
  )
}
