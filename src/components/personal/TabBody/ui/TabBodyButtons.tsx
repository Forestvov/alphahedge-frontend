import { useEffect, useState } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import {
  NavigationDrop,
  NavigationTabType,
} from 'components/shared/NavigationDrop'

import useInvestCounter from 'hooks/useInvestCounter'
import useProfile from 'hooks/context/useProfile'

import { UnlockIcon } from 'assets/icons'

import { TabBodyModal } from './TabBodyModal'

import { ITabBodyButtons, tabEnum } from '../model/TabBody.interface'

import s from './TabBody.module.scss'

export const TabBodyButtons = (props: ITabBodyButtons) => {
  const [p] = useTranslation('panel')
  const { tab, onClick } = props

  const [disable, setDisable] = useState(true)
  const [isWait, setIsWait] = useState(false)

  const { payload } = useProfile()
  const { counter } = useInvestCounter()

  const tabs: NavigationTabType[] = [
    {
      value: tabEnum.ACTIVE,
      label: p('actionsTab'),
      count: counter.actions,
    },
    {
      value: tabEnum.PACKAGE,
      label: p('simpleTab'),
      count: counter.simple,
    },
    {
      value: tabEnum.INDIVIDUAL,
      label: p('advancedTab'),
      count: counter.advanced,
    },
  ]

  useEffect(() => {
    if (payload.profile?.profileSetting.length) {
      const currentDate = new Date()
      const createDate = new Date(
        payload.profile?.profileSetting[0].profileSettingAccountValue,
      )
      const value = payload.profile?.profileSetting[0].profileSettingValue

      const timeDiff = Math.abs(createDate.getTime() - currentDate.getTime())
      const diffDays = Math.round(((timeDiff % 86400000) % 3600000) / 60000)

      if (diffDays >= Number(value)) {
        setDisable(false)
        return
      }
      setDisable(true)
      setIsWait(true)
    } else {
      setDisable(true)
    }
  }, [payload])

  return (
    <>
      <NavigationDrop className={s.dropdown} tabs={tabs} active={tab}>
        <button
          className={s.tab}
          onClick={() => onClick(tabEnum.ACTIVE)}
          disabled={tab === tabEnum.ACTIVE}
          type="button"
        >
          {p('actionsTab')}
        </button>
        <button
          className={s.tab}
          onClick={() => onClick(tabEnum.PACKAGE)}
          disabled={tab === tabEnum.PACKAGE}
          type="button"
        >
          {p('simpleTab')}
        </button>

        {!disable ? (
          <button
            className={s.tab}
            onClick={() => onClick(tabEnum.INDIVIDUAL)}
            disabled={tab === tabEnum.INDIVIDUAL}
            type="button"
          >
            <img src={UnlockIcon} alt="lock" />
            {p('advancedTab')}
          </button>
        ) : (
          <TabBodyModal payload={isWait ? 'success' : null} />
        )}
      </NavigationDrop>

      <div className={s.tabs}>
        <button
          className={cn(s.tab, s.active, {
            [s.current]: tab === tabEnum.ACTIVE,
          })}
          onClick={() => onClick(tabEnum.ACTIVE)}
          type="button"
        >
          {p('actionsTab')}
          {counter.actions && <div className={s.count}>{counter.actions}</div>}
        </button>
        <button
          className={cn(s.tab, s.package, {
            [s.current]: tab === tabEnum.PACKAGE,
          })}
          onClick={() => onClick(tabEnum.PACKAGE)}
          type="button"
        >
          {p('simpleTab')}
          {counter.simple && <div className={s.count}>{counter.simple}</div>}
        </button>

        {!disable ? (
          <button
            className={cn(s.tab, s.individual, {
              [s.current]: tab === tabEnum.INDIVIDUAL,
            })}
            onClick={() => onClick(tabEnum.INDIVIDUAL)}
            type="button"
          >
            <img src={UnlockIcon} alt="lock" />
            {p('advancedTab')}
            {counter.advanced && (
              <div className={s.count}>{counter.advanced}</div>
            )}
          </button>
        ) : (
          <TabBodyModal payload={isWait ? 'success' : null} />
        )}
      </div>
    </>
  )
}
