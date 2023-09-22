import { NavLink, useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import {
  AccountIcon,
  DashboardIcon,
  ExitIcon,
  HelpIcon,
  IndividualIcon,
  SystemAdminIcon,
  TransactionIcon,
  UsersIcon,
  Verification,
} from 'assets/icons'

import useProfile from 'hooks/context/useProfile'

import s from './AsideNavigation.module.scss'

interface IProps {
  onClick(type: boolean): void
}

export const AsideNavigationAdmin = ({ onClick }: IProps) => {
  const [t] = useTranslation('personalNavigation')

  const navigator = useNavigate()

  const { setPayload } = useProfile()

  const logoutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
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
        to="/admin/dashboard"
        onClick={() => onClick(true)}
      >
        <div className={s.icon}>
          <img src={DashboardIcon} alt="dashboard" />
        </div>
        <span>Dashboard</span>
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? s.current : '')}
        to="/admin"
        end
        onClick={() => onClick(true)}
      >
        <div className={s.icon}>
          <img src={AccountIcon} alt={t('account')} />
        </div>
        <span className={s.account}>{t('account')}</span>
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? s.current : '')}
        to="/admin/advanced"
        onClick={() => onClick(true)}
      >
        <div className={s.icon}>
          <img src={IndividualIcon} alt={t('indiv')} />
        </div>
        <span className={s.investments}>{t('indiv')}</span>
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? s.current : '')}
        to="/admin/users"
        end
        onClick={() => onClick(true)}
      >
        <div className={cn(s.icon, s.financeIcon)}>
          <img src={UsersIcon} alt={t('users')} />
        </div>
        <span className={s.finance}>{t('users')}</span>
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? s.current : '')}
        to="/admin/transaction"
        end
        onClick={() => onClick(true)}
      >
        <div className={cn(s.icon, s.transaction)}>
          <img src={TransactionIcon} alt={t('transactions')} />
        </div>
        <span className={s.finance}>{t('transactions')}</span>
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? s.current : '')}
        to="/admin/verification"
        end
        onClick={() => onClick(true)}
      >
        <div className={cn(s.icon, s.verification)}>
          <img src={Verification} alt={t('verify')} />
        </div>
        <span className={s.finance}>{t('verify')}</span>
      </NavLink>

      <NavLink
        className={({ isActive }) => (isActive ? s.current : '')}
        to="/admin/system"
        end
        onClick={() => onClick(true)}
      >
        <div className={cn(s.icon, s.verification)}>
          <img src={SystemAdminIcon} alt={t('system')} />
        </div>
        <span className={s.finance}>{t('system')}</span>
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
