import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import cn from 'classnames'

import useAdvanceCounter from 'hooks/useAdvanceCounter'
import useIndividualContext from 'hooks/useIndividualContext'

import { WrapperTable } from 'components/admins/WrapperTable'
import { IndividualBody } from 'components/admins/IndividualBody'
import {
  NavigationDrop,
  NavigationTabType,
} from 'components/shared/NavigationDrop'

import { ActiveTableBody } from './ActiveTable/ActiveTableBody'
import { CloseTableBody } from './CloseTable/CloseTableBody'

import s from './IndividualsBody.module.scss'

export const IndividualsBody = () => {
  const { counter } = useAdvanceCounter()

  const { advancedCard, setAdvancedCard } = useIndividualContext()

  const [, setSearchParams] = useSearchParams()

  const [tab, setTab] = useState<'active' | 'close'>('active')

  useEffect(() => {
    setSearchParams(undefined)
  }, [])

  const onClickHandler = (type: 'active' | 'close') => {
    setTab(type)
    setAdvancedCard({ userId: null, briefId: null })
    setSearchParams(undefined)
  }

  const tabs: NavigationTabType[] = [
    {
      value: 'active',
      label: 'Активные введения',
      count: counter.active ?? null,
    },
    {
      value: 'close',
      label: 'Заявки на закрытие',
      count: counter.close ?? null,
    },
  ]

  return (
    <>
      <NavigationDrop className={s.dropdown} tabs={tabs} active={tab}>
        <button
          className={s.tab}
          onClick={() => onClickHandler('active')}
          type="button"
        >
          Активные введения
        </button>
        <button
          className={s.tab}
          onClick={() => onClickHandler('close')}
          type="button"
        >
          Заявки на закрытие
        </button>
      </NavigationDrop>
      <div className={s.tabs}>
        <button
          className={cn(s.tab, s.active, { [s.current]: tab === 'active' })}
          onClick={() => onClickHandler('active')}
          type="button"
        >
          Активные введения
          {Boolean(counter.active) && (
            <div className={s.count}>{counter.active}</div>
          )}
        </button>
        <button
          className={cn(s.tab, s.close, {
            [s.current]: tab === 'close',
          })}
          onClick={() => onClickHandler('close')}
          type="button"
        >
          Заявки на закрытие
          {Boolean(counter.close) && (
            <div className={s.count}>{counter.close}</div>
          )}
        </button>
      </div>
      <WrapperTable hideTitle={Boolean(advancedCard.userId)}>
        <div className={s.body}>
          {advancedCard.userId && (
            <IndividualBody
              userId={advancedCard.userId}
              briefId={advancedCard.briefId}
            />
          )}
          {!advancedCard.userId && tab === 'active' && <ActiveTableBody />}
          {!advancedCard.userId && tab === 'close' && <CloseTableBody />}
        </div>
      </WrapperTable>
    </>
  )
}
