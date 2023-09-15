import { useState } from 'react'
import cn from 'classnames'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import WAValidator from 'vm-multicoin-address-validator'
import { toast } from 'react-toastify'

import useTokens from 'hooks/useTokens'

import { FetchStatusType } from 'models/FetchStatusType'
import { IRequestTransaction } from 'models/request/TransactionRequset'

import { DropDown } from 'components/shared/DropDown'
import { Input } from 'components/shared/Input'
import { Button } from 'components/shared/Button'

import TransactionServices from 'services/TransactionServices'

import { ITransactionForm } from '../../model/Transaction.interface'
import { transactionForm } from '../../lib/schema'

import s from './TransactionForm.module.scss'

const { getCoinPrice, addTransaction } = TransactionServices

export const TransactionForm = (props: ITransactionForm) => {
  const { className, type, fetch } = props

  const { tokens } = useTokens()

  const [coinPrice, setCoinPrice] = useState<string | null>()
  const [tokenName, setTokenName] = useState<string | null>(null)
  const [status, setStatus] = useState<FetchStatusType | null>(null)

  const notifyToken = () => toast.error('Данный токен недоступен')
  const notifyAddress = () => toast.error('Данный адресс вывода некорректен')

  const methods = useForm({
    resolver: yupResolver(transactionForm),
  })
  const { handleSubmit, reset } = methods

  const onSubmit = async (data: any) => {
    if (!coinPrice || !tokenName) {
      return
    }

    setStatus('pending')

    let body = {}

    if (type === 'In') {
      body = {
        amountOut: data.deposit,
        transactionType: type,
        transactionStatus: 'Process',
        currencyToken: tokenName,
        amountIn: (Number(data.deposit) / Number(coinPrice)).toString(),
      }
    }

    if (type === 'Out') {
      if (!WAValidator.validate(data.contact, tokenName)) {
        notifyAddress()
        setStatus('error')
        return
      }

      body = {
        amountOut: (Number(data.deposit) / Number(coinPrice)).toString(),
        transactionType: type,
        transactionStatus: 'Process',
        currencyToken: tokenName,
        amountIn: data.deposit,
        contact: data.contact,
      }
    }

    try {
      await addTransaction(body as IRequestTransaction)
      await fetch()
      setStatus('success')
    } catch (e) {
      console.log('Error add transaction', e)
      setStatus('error')
    } finally {
      reset()
    }
  }

  const onSelectToken = async (coin: string) => {
    try {
      const response = await getCoinPrice(coin)
      setCoinPrice(response.data.price)
      setTokenName(coin)
    } catch (e) {
      if (tokenName) {
        setTokenName(null)
      }
      notifyToken()
      console.log('Failed get token', e)
    }
  }

  return (
    <FormProvider {...methods}>
      <form className={cn(s.form, className)} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.col}>
          <DropDown
            className={cn({ [s.dropIn]: type === 'In' })}
            placeholder="Платежная система"
            onSelect={onSelectToken}
            options={
              tokens
                ? tokens.map((token) => ({
                    id: token.currencyTypeId,
                    label: token.currencyToken,
                    image: token.image,
                  }))
                : []
            }
          />
          <div className={s.label}>Выберите Платежную систему</div>
        </div>
        <div className={s.col}>
          <Input
            prefix="$"
            className={s.input}
            placeholder={`Введите сумму ${
              type === 'Out' ? 'вывода' : 'пополнения'
            }`}
            type="text"
            name="deposit"
          />
          <div className={s.label}>
            Укажите сумму для {type === 'Out' ? 'вывода' : 'пополнения'}
          </div>
        </div>
        {type === 'Out' && (
          <div className={s.col}>
            <Input
              className={s.input}
              placeholder="Введите адрес кошелька"
              type="text"
              name="contact"
            />
            <div className={s.label}>адресс вывода</div>
          </div>
        )}
        <Button
          className={s.button}
          disabled={status === 'pending'}
          type="submit"
        >
          {type === 'Out' ? 'Вывод' : 'Пополнить'}
        </Button>
        {type === 'Out' && (
          <p className={s.notification}>
            *Запрос обрабатывается максимально до 24ч
          </p>
        )}
      </form>
    </FormProvider>
  )
}
