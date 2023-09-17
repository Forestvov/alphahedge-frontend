import cn from 'classnames'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import useGetMainInfo from 'hooks/useGetMainInfo'

import BriefcaseServices from 'services/BriefcaseServices'

import { IInvestBriefcase } from 'models/request/BriefcaseRequest'
import { FetchStatusType } from 'models/FetchStatusType'

import { Input } from 'components/shared/Input'
import { Button } from 'components/shared/Button'

import { IInfoCardForm } from '../model/InfoCard.interface'

import s from './InfoCard.module.scss'

interface IField {
  amount: string
}

const { investBriefcase } = BriefcaseServices

export const InfoCardForm = (props: IInfoCardForm) => {
  const { briefcaseId, minValue, fetch, briefcaseInvestStatus } = props

  const [n] = useTranslation(`notification`)
  const [f] = useTranslation(`form`)

  const [status, setStatus] = useState<FetchStatusType | null>(null)

  const getMainInfo = useGetMainInfo()

  const methods = useForm<IField>()

  const { handleSubmit, setError } = methods

  const notifyError = () => toast.error(n('errorMessage'))
  const notifySuccess = () => toast.success(n('successInvest'))

  const onSubmit = async (body: IField) => {
    const amount = Number(body.amount?.replace(/[^+\d]/g, ''))

    if (briefcaseInvestStatus === 'Disable') {
      return
    }

    if (amount < minValue) {
      setError('amount', { message: `${f('minDeposit')} ${minValue}` })
      return
    }

    setStatus('pending')

    try {
      const data: IInvestBriefcase = {
        briefcaseId,
        amount,
      }

      await investBriefcase(data)
      await fetch()
      await getMainInfo()
      setStatus('success')
      notifySuccess()
    } catch (e) {
      notifyError()
      console.log('Error send invest', e)
      setStatus('error')
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        className={cn(s.form, {
          [s.disable]: briefcaseInvestStatus === 'Disable',
        })}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={s.wrapper}>
          <Input
            className={s.input}
            placeholder={f('depositPlaceholder')}
            type="text"
            prefix="$"
            name="amount"
          />
          {briefcaseInvestStatus === 'Disable' && (
            <svg
              className={s.lock}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="18"
              viewBox="0 0 14 18"
              fill="none"
            >
              <path
                d="M11.6413 6.75H11.087V4.5C11.087 2.01818 9.09803 0 6.65217 0C4.20632 0 2.21739 2.01818 2.21739 4.5V6.75H1.66304C0.746533 6.75 0 7.50667 0 8.4375V16.3125C0 17.2433 0.746533 18 1.66304 18H11.6413C12.5578 18 13.3043 17.2433 13.3043 16.3125V8.4375C13.3043 7.50667 12.5578 6.75 11.6413 6.75ZM3.6957 4.5C3.6957 2.84544 5.02163 1.50005 6.65217 1.50005C8.28272 1.50005 9.60865 2.84548 9.60865 4.5V6.75H3.6957V4.5Z"
                fill="#818181"
              />
            </svg>
          )}
        </div>
        <Button
          className={s.button}
          disabled={status === 'pending'}
          type="submit"
        >
          {f('onInvest')}
        </Button>
      </form>
    </FormProvider>
  )
}
