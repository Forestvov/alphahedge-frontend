import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { DropArrow } from 'assets/icons'

import s from './Header.module.scss'

export const HeaderNav = () => {
  const [l] = useTranslation('layout')

  return (
    <nav className={s.navigation}>
      <NavLink
        className={({ isActive }) => cn(s.link, { [s.current]: isActive })}
        to="/"
      >
        {l('homeLink')}
      </NavLink>
      <NavLink className={`${s.link} ${s.drop}`} to="/investingPro">
        InvestingPro
        <img className={s.dropArrow} src={DropArrow} alt="" />
        <div className={s.dropDown}>
          <NavLink
            className={({ isActive }) =>
              cn(s.link, s.link_black, { [s.current]: isActive })
            }
            to="/forex"
          >
            Forex
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              cn(s.link, s.link_black, { [s.current]: isActive })
            }
            to="/about"
          >
            {l('fond')}
          </NavLink>
        </div>
      </NavLink>
      <NavLink
        className={({ isActive }) => cn(s.link, { [s.current]: isActive })}
        to="/trends"
      >
        {l('trendsLink')}
      </NavLink>
      <NavLink
        className={({ isActive }) => cn(s.link, { [s.current]: isActive })}
        to="/contacts"
      >
        {l('contactsLink')}
      </NavLink>
    </nav>
  )
}
