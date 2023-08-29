import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import {
  AccountIcon,
  DashboardIcon,
  FinanceIcon,
  InvestmentsIcon,
} from 'assets/icons'

import s from './AsideNavigation.module.scss'

export const AsideNavigationUser = () => (
  <>
    <NavLink
      end
      className={({ isActive }) => (isActive ? s.current : '')}
      to="/personal/dashboard"
    >
      <div className={s.icon}>
        <img src={DashboardIcon} alt="dashboard" />
      </div>
      <span>Dashboard</span>
    </NavLink>

    <NavLink
      className={({ isActive }) => (isActive ? s.current : '')}
      to="/personal/investments"
    >
      <div className={s.icon}>
        <img src={InvestmentsIcon} alt="инвестиции" />
      </div>
      <span className={s.investments}>Инвестиции</span>
    </NavLink>

    <NavLink
      className={({ isActive }) => (isActive ? s.current : '')}
      to="/personal/finance"
      end
    >
      <div className={cn(s.icon, s.financeIcon)}>
        <img src={FinanceIcon} alt="финансы" />
      </div>
      <span className={s.finance}>Финансы</span>
    </NavLink>

    <NavLink
      className={({ isActive }) => (isActive ? s.current : '')}
      to="/personal"
      end
    >
      <div className={s.icon}>
        <img src={AccountIcon} alt="аккаунт" />
      </div>
      <span className={s.account}>Аккаунт</span>
    </NavLink>
  </>
)
