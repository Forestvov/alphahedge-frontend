import cn from 'classnames'

import { IBriefcaseActive } from 'models/response/BriefcaseResponse'

import { getRemainDays } from 'helpers/getRemainDays'
import { getNoun } from 'helpers/getNoun'
import formatPrice from 'helpers/priceFormat'

import { BigLockIcon, BigUnlockIcon } from 'assets/icons'

import { Button } from 'components/shared/Button'

import BriefcaseServices from 'services/BriefcaseServices'
import useGetMainInfo from 'hooks/useGetMainInfo'
import { IInvestBriefcase } from 'models/request/BriefcaseRequest'

import { IndividualCardModal } from './IndividualCardModal'

import s from './IndividualCard.module.scss'

const { investBriefcase } = BriefcaseServices

interface IIndividualCard extends IBriefcaseActive {
  fetch: () => void
}

export const IndividualCard = (props: IIndividualCard) => {
  const {
    amountMin,
    briefcaseId,
    briefcaseInvestStatus,
    briefcaseAccountId,
    briefcaseAccountStatus,
    createddate,
    fetch,
  } = props

  const getMainInfo = useGetMainInfo()

  const isOpen = briefcaseAccountStatus === 'Active'
  const isDisable = briefcaseInvestStatus === 'Disable'

  const investHandler = async () => {
    try {
      const data: IInvestBriefcase = {
        briefcaseId,
        amount: amountMin,
      }

      await investBriefcase(data)
      await fetch()
      await getMainInfo()
    } catch (e) {
      console.log('Error invest', e)
    }
  }

  return (
    <div className={s.card}>
      <div className={s.header}>
        <img src={isDisable ? BigLockIcon : BigUnlockIcon} alt="" />
        {createddate && (
          <div className={s.day}>
            {getRemainDays(createddate)}{' '}
            {getNoun({
              number: getRemainDays(createddate),
              five: 'дней',
              two: 'дня',
              one: 'день',
            })}{' '}
            назад
          </div>
        )}
      </div>
      <div className={s.row}>
        <div className={s.cell}>
          <div className={s.label}>Объем инвестиций</div>
          <div className={s.price}>
            $ {formatPrice(amountMin).toString().replace(/,/gi, ' ')}
          </div>
        </div>
        <div className={s.cell}>
          <div className={s.label}>Статус</div>
          <div className={s.status}>
            <div className={cn(s.icon, { [s.active]: isOpen })}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="10"
                viewBox="0 0 13 10"
                fill="none"
              >
                <path d="M1 4L5 8L12 1" stroke="black" strokeWidth="2" />
              </svg>
            </div>
            <div className={s.statusText}>
              {isOpen ? 'активный' : 'Не активный'}
            </div>
          </div>
        </div>

        {isOpen ? (
          <IndividualCardModal
            isDisable={isDisable}
            update={fetch}
            briefcaseId={briefcaseAccountId}
          />
        ) : (
          <Button
            className={s.button}
            disabled={isDisable}
            type="button"
            onClick={investHandler}
          >
            открыть
          </Button>
        )}
      </div>
    </div>
  )
}
