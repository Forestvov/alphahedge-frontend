import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import {
  AccountIcon,
  DashboardIcon,
  IndividualIcon,
  TransactionIcon,
  UsersIcon,
  Verification,
} from 'assets/icons'

import s from './AsideNavigation.module.scss'

interface IProps {
  onClick(type: boolean): void
}

export const AsideNavigationAdmin = ({ onClick }: IProps) => {
  const [t] = useTranslation('personalNavigation')

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
    </>
  )
}
