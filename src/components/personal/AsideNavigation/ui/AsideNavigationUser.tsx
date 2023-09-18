import { NavLink, useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import useProfile from 'hooks/context/useProfile'

import {
  AccountIcon,
  DashboardIcon,
  ExitIcon,
  FinanceIcon,
  HelpIcon,
  InvestmentsIcon,
} from 'assets/icons'

import s from './AsideNavigation.module.scss'

interface IProps {
  onClick(type: boolean): void
}

export const AsideNavigationUser = ({ onClick }: IProps) => {
  const [t] = useTranslation('personalNavigation')

  const navigator = useNavigate()

  const { setPayload } = useProfile()

  const logoutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('Account-Id')
    localStorage.removeItem('editor')
    localStorage.removeItem('user-type')

    onClick(true)
    navigator('/')
    setPayload({ isAuth: false, loading: false })
  }

  return (
    <>
      <NavLink
        end
        className={({ isActive }) => (isActive ? s.current : '')}
        to="/personal/dashboard"
        onClick={() => onClick(true)}
      >
        <div className={s.icon}>
          <img src={DashboardIcon} alt="dashboard" />
        </div>
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? s.current : '')}
        to="/personal/investments"
        onClick={() => onClick(true)}
      >
        <div className={s.icon}>
          <img src={InvestmentsIcon} alt={t('invest')} />
        </div>
        <span className={s.investments}>{t('invest')}</span>
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? s.current : '')}
        to="/personal/finance"
        end
        onClick={() => onClick(true)}
      >
        <div className={cn(s.icon, s.financeIcon)}>
          <img src={FinanceIcon} alt={t('finance')} />
        </div>
        <span className={s.finance}>{t('finance')}</span>
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? s.current : '')}
        to="/personal"
        end
        onClick={() => onClick(true)}
      >
        <div className={s.icon}>
          <img src={AccountIcon} alt={t('account')} />
        </div>
        <span className={s.account}>{t('account')}</span>
      </NavLink>

      <NavLink className={s.mobile} to="/help" onClick={() => onClick(true)}>
        <div className={s.icon}>
          <img src={HelpIcon} alt={t('help')} />
        </div>
        <span>{t('help')}</span>
      </NavLink>
      <button className={s.mobile} type="button" onClick={logoutHandler}>
        <div className={s.icon}>
          <img src={ExitIcon} alt={t('exit')} />
        </div>
        <span>{t('exit')}</span>
      </button>
    </>
  )
}
