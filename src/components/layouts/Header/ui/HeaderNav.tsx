import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { DropArrow } from 'assets/icons'

import s from './Header.module.scss'

export const HeaderNav = () => {
  const [l] = useTranslation('layout')

  return (
    <nav className={s.navigation}>
      <NavLink className={cn(s.link, s.current)} to="/">
        {l('homeLink')}
      </NavLink>
      <NavLink className={`${s.link} ${s.drop}`} to="/">
        InvestingPro
        <img className={s.dropArrow} src={DropArrow} alt="" />
        <div className={s.dropDown}>
          <NavLink className={`${s.link} ${s.link_black}`} to="/forex">
            Forex
          </NavLink>
          <NavLink className={`${s.link} ${s.link_black}`} to="/about">
            {l('fond')}
          </NavLink>
        </div>
      </NavLink>
      <NavLink className={s.link} to="/">
        {l('trendsLink')}
      </NavLink>
      <NavLink className={s.link} to="/">
        {l('contactsLink')}
      </NavLink>
    </nav>
  )
}
