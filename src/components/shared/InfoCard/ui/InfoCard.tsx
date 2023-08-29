import cn from 'classnames'

import { Price } from 'components/shared/Price'

import { IInfoCard } from '../model/InfoCard.interface'

import { InfoCardContent } from './InfoCardContent'
import { InfoCardStat } from './InfoCardStat'
import { InfoCardActive } from './InfoCardActive'
import { InfoCardForm } from './InfoCardForm'

import s from './InfoCard.module.scss'

export const InfoCard = (props: IInfoCard) => {
  const { className, isActive = false, isAdmin = false } = props

  return (
    <div className={cn(s.card, className)}>
      <InfoCardContent isActive={isActive} isAdmin={isAdmin} />
      {isActive && (
        <div className={s.actives}>
          <InfoCardActive label="Инвестированно">
            <Price type="xs" price="350" />
          </InfoCardActive>
          <InfoCardActive label="Ежедневный доход">
            <Price type="xs" price="1.225" />
          </InfoCardActive>
          <InfoCardActive label="Осталось дней">
            <span className={s.days}>59</span>дней
          </InfoCardActive>
        </div>
      )}
      {!isActive && <InfoCardForm />}
      <div className={s.stats}>
        <InfoCardStat label="Минимальный депозит" value="$ 250" />
        <InfoCardStat label="Ежедневный доход" value="0.35 %" />
        <InfoCardStat label="Период блокировки" value="60 дней" />
      </div>
    </div>
  )
}
