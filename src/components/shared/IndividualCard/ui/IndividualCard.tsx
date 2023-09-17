import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { FormProvider, useForm } from 'react-hook-form'

import { InfoCardForm } from 'components/shared/InfoCard/ui/InfoCardForm'

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

  const methods = useForm()

  const [c] = useTranslation('common')

  const getMainInfo = useGetMainInfo()

  const isOpen = briefcaseAccountStatus === 'Active'
  const isDisable = briefcaseInvestStatus === 'Disable'

  const [open, setOpen] = useState(false)

  const investHandler = async () => {
    if (!open) {
      setOpen(true)
      return
    }

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
    <FormProvider {...methods}>
      <div className={s.card}>
        <div className={s.header}>
          <img src={isDisable ? BigLockIcon : BigUnlockIcon} alt="" />
          {createddate && (
            <div className={s.day}>
              {getRemainDays(createddate)}{' '}
              {getNoun({
                number: getRemainDays(createddate),
                five: c('dayFive'),
                two: c('dayTwo'),
                one: c('dayOne'),
              })}{' '}
              {c('beforeText')}
            </div>
          )}
        </div>
        <div className={s.row}>
          <div className={s.cell}>
            <div className={s.label}>{c('totalInvest')}</div>
            <div className={s.price}>
              $ {formatPrice(amountMin).toString().replace(/,/gi, ' ')}
            </div>
          </div>
          <div className={s.cell}>
            <div className={s.label}>{c('status')}</div>
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
                {isOpen ? c('isActive') : c('nonActive')}
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
              className={cn(s.button, { [s.hide]: open })}
              disabled={isDisable}
              type="button"
              onClick={investHandler}
            >
              {c('open')}
            </Button>
          )}
        </div>

        <AnimateHeight className={s.form} height={open && !isOpen ? 'auto' : 0}>
          <InfoCardForm
            briefcaseId={briefcaseId}
            fetch={fetch}
            minValue={amountMin}
            briefcaseInvestStatus={briefcaseInvestStatus}
          />
        </AnimateHeight>
      </div>
    </FormProvider>
  )
}
