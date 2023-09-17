import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import { Price } from 'components/shared/Price'
import useDisable from 'hooks/useDisable'
import { IBriefcaseActive } from 'models/response/BriefcaseResponse'

import { getNoun } from 'helpers/getNoun'
import { floorPrice } from 'helpers/floorPrice'
import { getRemainDays } from 'helpers/getRemainDays'
import formatPrice from 'helpers/priceFormat'

import { InfoCardContent } from './InfoCardContent'
import { InfoCardStat } from './InfoCardStat'
import { InfoCardActive } from './InfoCardActive'
import { InfoCardForm } from './InfoCardForm'

import s from './InfoCard.module.scss'

interface IProps {
  isAdmin?: boolean
  className?: string
  fetch?: () => Promise<void>
}

export const InfoCard = (props: IBriefcaseActive & IProps) => {
  const [t] = useTranslation(`simpleCard`)
  const [c] = useTranslation(`common`)

  const {
    isAdmin = false,
    remainDays,
    amount,
    gainAmount,
    className,
    briefcaseAccountStatus,
    ranges,
    briefcaseAccountId,
    amountMin,
    percents,
    briefcaseId,
    createddate,
    image,
    fetch = () => null,
    briefcaseInvestStatus,
  } = props

  const isActive = briefcaseAccountStatus === 'Active'

  const disableAction = useDisable()

  return (
    <div className={cn(s.card, className)}>
      <InfoCardContent
        name={t(`${briefcaseId}.title`)}
        image={image}
        description={t(`${briefcaseId}.description`)}
        titleList={t(`${briefcaseId}.titleList`)}
        actionList={t(`${briefcaseId}.actionList`, {
          returnObjects: true,
          defaultValue: ['', ''],
        })}
        technologies={t(`${briefcaseId}.technologies`, {
          returnObjects: true,
          defaultValue: ['', ''],
        })}
        isActive={isActive}
        id={briefcaseAccountId}
        isAdmin={isAdmin}
        fetch={fetch}
      />
      {isActive && (
        <div className={s.actives}>
          <InfoCardActive label={t('invested')}>
            <Price type="xs" price={amount ?? 0} />
          </InfoCardActive>
          <InfoCardActive label={t('dailyIncome')}>
            <Price type="xs" price={gainAmount ? floorPrice(gainAmount) : 0} />
          </InfoCardActive>
          <InfoCardActive label={t('daysLeft')}>
            <span className={s.days}>
              {ranges - getRemainDays(createddate)}
            </span>
            {getNoun({
              number: remainDays ?? 0,
              five: c('dayFive'),
              two: c('dayTwo'),
              one: c('dayOne'),
            })}
          </InfoCardActive>
        </div>
      )}
      {!isActive && !disableAction && (
        <InfoCardForm
          briefcaseId={briefcaseId}
          fetch={fetch}
          minValue={amountMin}
          briefcaseInvestStatus={briefcaseInvestStatus}
        />
      )}
      <div className={s.stats}>
        <InfoCardStat
          label={t('minDeposit')}
          value={`$ ${formatPrice(amountMin)}`}
        />
        <InfoCardStat label={t('dailyIncome')} value={`${percents} %`} />
        <InfoCardStat
          label={t('blockingPeriod')}
          value={`${ranges} ${c('dayFive')}`}
        />
      </div>
    </div>
  )
}
