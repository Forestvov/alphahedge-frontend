import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import {
  AccountIcon,
  DashboardIcon,
  IndividualIcon,
  TransactionIcon,
  UsersIcon,
  Verification,
} from 'assets/icons'

import s from './AsideNavigation.module.scss'

export const AsideNavigationAdmin = () => (
  <>
    <NavLink
      end
      className={({ isActive }) => (isActive ? s.current : '')}
      to="/admin/dashboard"
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
    >
      <div className={s.icon}>
        <img src={AccountIcon} alt="аккаунт" />
      </div>
      <span className={s.account}>Аккаунт</span>
    </NavLink>

    <NavLink
      className={({ isActive }) => (isActive ? s.current : '')}
      to="/admin/individuals"
    >
      <div className={s.icon}>
        <img src={IndividualIcon} alt="индвидиуальные" />
      </div>
      <span className={s.investments}>Индвидиуальные В.</span>
    </NavLink>

    <NavLink
      className={({ isActive }) => (isActive ? s.current : '')}
      to="/admin/users"
      end
    >
      <div className={cn(s.icon, s.financeIcon)}>
        <img src={UsersIcon} alt="пользователи" />
      </div>
      <span className={s.finance}>Пользователи</span>
    </NavLink>

    <NavLink
      className={({ isActive }) => (isActive ? s.current : '')}
      to="/admin/transaction"
      end
    >
      <div className={cn(s.icon, s.transaction)}>
        <img src={TransactionIcon} alt="транзакции" />
      </div>
      <span className={s.finance}>Транзакции</span>
    </NavLink>

    <NavLink
      className={({ isActive }) => (isActive ? s.current : '')}
      to="/admin/verification"
      end
    >
      <div className={cn(s.icon, s.verification)}>
        <img src={Verification} alt="верификация" />
      </div>
      <span className={s.finance}>Верификация</span>
    </NavLink>
  </>
)
