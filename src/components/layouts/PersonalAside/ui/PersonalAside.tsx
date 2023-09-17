import { useRef, useState } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import { useOnOutsideClick } from 'hooks/useOnOutsideClick'

import { AsideUserInfo } from 'components/personal/AsideUserInfo'
import { AsideNavigation } from 'components/personal/AsideNavigation'
import { AsideBottom } from 'components/personal/AsideBottom'

import { DoubleArrowIcon, LogoBlue } from 'assets/icons'

import { IPersonalAside } from '../model/PersonalAside.interface'

import s from './PersonalAside.module.scss'

export const PersonalAside = ({ adminEdit }: IPersonalAside) => {
  const [t] = useTranslation('personalNavigation')

  const [isSplit, setIsSplit] = useState(false)

  const toggleHandler = (split: boolean) => {
    const { classList } = document.body

    if (!split) {
      classList.add('fixed')
    } else {
      classList.remove('fixed')
    }

    setIsSplit(!split)
  }

  const ref = useRef<any>()

  useOnOutsideClick(ref, () => isSplit && toggleHandler(true))

  const onChangePage = () => {
    toggleHandler(true)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <aside className={cn(s.aside, { [s.slide]: isSplit })} ref={ref}>
      <div className={s.logo}>
        <img src={LogoBlue} alt="logo" />
      </div>
      <AsideUserInfo isSplit={isSplit} />
      <AsideNavigation adminEdit={adminEdit} onClick={onChangePage} />
      <button
        className={s.toggle}
        onClick={() => toggleHandler(isSplit)}
        type="button"
      >
        <img src={DoubleArrowIcon} alt="" />
        <span>{t('split')}</span>
      </button>
      <AsideBottom />
    </aside>
  )
}
