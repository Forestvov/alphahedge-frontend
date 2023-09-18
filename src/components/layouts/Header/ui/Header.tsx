import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import useProfile from 'hooks/context/useProfile'

import { useWindowSize } from 'hooks/useWindowSize'

import { Container } from 'components/shared/Container'
import { ChangeLanguage } from 'components/shared/ChangeLanguage'

import { HeaderLogo, UserIcon } from 'assets/icons'

import { HeaderNav } from './HeaderNav'

import s from './Header.module.scss'

export const Header = () => {
  const { payload } = useProfile()

  const { pathname } = useLocation()

  const { width } = useWindowSize()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [pathname])

  return (
    <header
      className={pathname === '/' ? s.header : `${s.header} ${s.header_black}`}
    >
      <Container>
        <div className={s.inner}>
          <Link className={s.logo} to="/">
            <img src={HeaderLogo} alt="logo" />
          </Link>
          {width > 900 && <HeaderNav />}
          <div className={s.actions}>
            <ChangeLanguage />
            <Link
              className={s.user}
              to={
                payload?.isAuth
                  ? `/${
                      payload?.profile?.role === 'User' ? 'personal' : 'admin'
                    }/dashboard`
                  : '/login'
              }
            >
              <img src={UserIcon} alt="user-icon" />
            </Link>
          </div>
        </div>
        {width <= 900 && <HeaderNav />}
      </Container>
    </header>
  )
}
