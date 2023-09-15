import cn from 'classnames'
import { NavLink } from 'react-router-dom'

import { DropArrow } from 'assets/icons'

import s from './Header.module.scss'

export const HeaderNav = () => (
  <nav className={s.navigation}>
    <NavLink className={cn(s.link, s.current)} to="/">
      Главная
    </NavLink>
    <NavLink className={`${s.link} ${s.drop}`} to="/">
      InvestingPro
      <img className={s.dropArrow} src={DropArrow} alt="" />
      <div className={s.dropDown}>
        <NavLink className={`${s.link} ${s.link_black}`} to="/forex">
          Forex
        </NavLink>
        <NavLink className={`${s.link} ${s.link_black}`} to="/about">
          О нас
        </NavLink>
      </div>
    </NavLink>
    <NavLink className={s.link} to="/">
      Тренды
    </NavLink>
    <NavLink className={s.link} to="/">
      Контакты
    </NavLink>
  </nav>
)
