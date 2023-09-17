import { useState } from 'react'
import AnimateHeight from 'react-animate-height'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import { floorPrice } from 'helpers/floorPrice'

import ActionServices from 'services/ActionServices'

import { IActionRequest } from 'models/request/ActionRequest'
import { FetchStatusType } from 'models/FetchStatusType'

import { Button } from 'components/shared/Button'
import { CounterChanger } from 'components/shared/CounterChanger'

import s from './PromotionCard.module.scss'

interface IPromotionCardActions {
  code: string
  currentPrice: number
  fetchData: () => Promise<void>
}

const { actionInvest } = ActionServices

export const PromotionCardActions = (props: IPromotionCardActions) => {
  const [c] = useTranslation('common')

  const { code, currentPrice, fetchData } = props

  const [count, setCount] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<FetchStatusType | null>(null)

  const onChangeCounter = async () => {
    if (!isOpen) {
      setIsOpen(true)
      return
    }

    setStatus('pending')

    const data: IActionRequest = {
      code,
      count: count.toString(),
    }

    try {
      await actionInvest(data)
      await fetchData()
      setStatus('success')
      setIsOpen(false)
      setCount(1)
    } catch (e) {
      setStatus('error')
      console.log('Error invest action', e)
    }
  }

  const incrementHandler = () => {
    setCount((prevState) => prevState + 1)
  }

  const decrementCounter = () => {
    if (count > 1) {
      setCount((prevState) => prevState - 1)
    }
  }

  return (
    <div>
      <Button
        className={cn(s.button, { [s.apply]: isOpen })}
        type="button"
        disabled={status === 'pending'}
        onClick={onChangeCounter}
      >
        {isOpen ? c('Accept') : c('buy')}
        <span className={s.price}>$ {floorPrice(currentPrice * count)}</span>
      </Button>
      <AnimateHeight height={isOpen ? 'auto' : 0}>
        <div className={s.body}>
          <div className={s.counter}>
            <div className={s.counterLabel}>{c('selectCount')}</div>
            <CounterChanger
              decrement={decrementCounter}
              value={count}
              increment={incrementHandler}
            />
          </div>
          <p className={s.notification}>{c('nonDs')}</p>
        </div>
      </AnimateHeight>
    </div>
  )
}
