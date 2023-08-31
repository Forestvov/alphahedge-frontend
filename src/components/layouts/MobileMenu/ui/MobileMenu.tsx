import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import {
  AccountIcon,
  DashboardIcon,
  FinanceIcon,
  InvestmentsIcon,
  LogoBlue,
  TransactionIcon,
  UsersIcon,
} from 'assets/icons'

import { AsideNavigation } from 'components/personal/AsideNavigation'
import { AsideUserInfo } from 'components/personal/AsideUserInfo'

import { useAuth } from 'hooks/useAuth'

import s from './MobileMenu.module.scss'

export const MobileMenu = (props: { adminEdit: boolean }) => {
  const { adminEdit } = props

  const [isOpen, setIsOpen] = useState(false)

  const { role } = useAuth()

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (isOpen) {
        const body = document.body
        body.classList.remove('fixed')
        setIsOpen(false)
      }
    })
  }, [isOpen])

  const toggleOpenHandler = (open: boolean) => {
    const body = document.body

    if (!open) {
      body.classList.add('fixed')
    } else {
      body.classList.remove('fixed')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    setIsOpen(!open)
  }

  return (
    <>
      <div className={cn(s.menu, { [s.open]: isOpen })}>
        <div className={s.logo}>
          <img src={LogoBlue} alt="logo" />
        </div>
        <AsideUserInfo isSplit={false} />
        <AsideNavigation
          onClick={() => toggleOpenHandler(true)}
          adminEdit={adminEdit}
        />
      </div>
      <div className={s.header}>
        {role === 'USER' && (
          <>
            <NavLink
              className={({ isActive }) => (isActive ? s.current : '')}
              to="/personal/dashboard"
              onClick={() => toggleOpenHandler(true)}
              end
            >
              <div className={s.icon}>
                <img src={DashboardIcon} alt="dashboard" />
              </div>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? s.current : '')}
              to="/personal/investments"
              onClick={() => toggleOpenHandler(true)}
            >
              <div className={s.icon}>
                <img src={InvestmentsIcon} alt="инвестиции" />
              </div>
            </NavLink>
          </>
        )}

        {role === 'ADMIN' && (
          <>
            <NavLink
              className={({ isActive }) => (isActive ? s.current : '')}
              to="/admin/dashboard"
              onClick={() => toggleOpenHandler(true)}
              end
            >
              <div className={s.icon}>
                <img src={DashboardIcon} alt="dashboard" />
              </div>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? s.current : '')}
              to="/admin"
              onClick={() => toggleOpenHandler(true)}
              end
            >
              <div className={cn(s.icon, s.acc)}>
                <img src={AccountIcon} alt="аккаунт" />
              </div>
            </NavLink>
          </>
        )}

        <button
          className={cn(s.button, { [s.active]: isOpen })}
          type="button"
          onClick={() => toggleOpenHandler(isOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        {role === 'ADMIN' && (
          <>
            <NavLink
              className={({ isActive }) => (isActive ? s.current : '')}
              to="/admin/users"
              end
              onClick={() => toggleOpenHandler(true)}
            >
              <div className={cn(s.icon, s.user)}>
                <img src={UsersIcon} alt="пользователи" />
              </div>
            </NavLink>

            <NavLink
              className={({ isActive }) => (isActive ? s.current : '')}
              to="/admin/transaction"
              end
              onClick={() => toggleOpenHandler(true)}
            >
              <div className={cn(s.icon, s.transaction)}>
                <img src={TransactionIcon} alt="транзакции" />
              </div>
            </NavLink>
          </>
        )}

        {role === 'USER' && (
          <>
            <NavLink
              className={({ isActive }) => (isActive ? s.current : '')}
              to="/personal/finance"
              end
              onClick={() => toggleOpenHandler(true)}
            >
              <div className={cn(s.icon, s.financeIcon)}>
                <img src={FinanceIcon} alt="финансы" />
              </div>
            </NavLink>

            <NavLink
              className={({ isActive }) => (isActive ? s.current : '')}
              to="/personal"
              end
              onClick={() => toggleOpenHandler(true)}
            >
              <div className={cn(s.icon, s.acc)}>
                <img src={AccountIcon} alt="аккаунт" />
              </div>
            </NavLink>
          </>
        )}
      </div>
    </>
  )
}
