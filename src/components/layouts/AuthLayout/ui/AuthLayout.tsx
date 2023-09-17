import { Navigate } from 'react-router-dom'
import React from 'react'
import { Outlet } from 'react-router'
import { useTranslation } from 'react-i18next'

import { PageLoader } from 'components/shared/Loader'

import useProfile from 'hooks/context/useProfile'

import {
  BgIcon,
  FirstIcon,
  FourthIcon,
  SecondIcon,
  ThirdIcon,
} from 'assets/icons'
import { PreviewImage } from 'assets/images'

import s from './AuthLayout.module.scss'

export const AuthLayout = () => {
  const [t] = useTranslation('authPage')

  const { payload } = useProfile()

  if (payload.loading) {
    return <PageLoader />
  }

  if (payload.isAuth && payload.profile?.role === 'User') {
    return <Navigate to="/personal/dashboard" />
  }

  if (payload.isAuth && payload.profile?.role === 'Admin') {
    return <Navigate to="/admin/dashboard" />
  }

  return (
    <div className={s.wrapper}>
      <img className={s.bg} src={BgIcon} alt="" />
      <div className={s.left}>
        <Outlet />
      </div>
      <div className={s.right}>
        <h2 className={s.title}>Alphahedge Holdings</h2>
        <p className={s.text}>{t('rightText')}</p>
        <ul className={s.list}>
          <li>
            <img src={FirstIcon} alt="" />
            <p>{t('item1')}</p>
          </li>
          <li>
            <img src={SecondIcon} alt="" />
            <p>{t('item2')}</p>
          </li>
          <li>
            <img src={ThirdIcon} alt="" />
            <p>{t('item3')}</p>
          </li>
          <li>
            <img src={FourthIcon} alt="" />
            <p>{t('item4')}</p>
          </li>
        </ul>
        <img className={s.preview} src={PreviewImage} alt="" />
      </div>
    </div>
  )
}
