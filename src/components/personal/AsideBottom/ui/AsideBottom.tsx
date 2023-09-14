import { NavLink, useNavigate } from 'react-router-dom'

import { ExitIcon, HelpIcon } from 'assets/icons'
import useProfile from 'hooks/context/useProfile'

import s from './AsideBottom.module.scss'

export const AsideBottom = () => {
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
      <NavLink to="/">
        <div className={s.icon}>
          <img src={HelpIcon} alt="помощь" />
        </div>
        <span>Помощь</span>
      </NavLink>
      <button type="button" onClick={logoutHandler}>
        <div className={s.icon}>
          <img src={ExitIcon} alt="выход" />
        </div>
        <span>Выход</span>
      </button>
    </div>
  )
}
