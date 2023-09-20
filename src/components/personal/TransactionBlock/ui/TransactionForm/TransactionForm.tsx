import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import WAValidator from 'vm-multicoin-address-validator'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import useTokens from 'hooks/useTokens'

import { FetchStatusType } from 'models/FetchStatusType'
import { IRequestTransaction } from 'models/request/TransactionRequset'
import { TransactionBody } from 'models/IToken'

import { DropDown } from 'components/shared/DropDown'
import { Input } from 'components/shared/Input'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'

import TransactionServices from 'services/TransactionServices'
import AccountServices from 'services/AccountServices'

import { IProfileToken } from 'models/response/AccountResponse'

import { TransactionPopup } from '../TransactionPopup/TransactionPopup'

import { ITransactionForm } from '../../model/Transaction.interface'
import { paymentCart } from '../../lib/paymentCart'
import { transactionForm } from '../../lib/schema'

import s from './TransactionForm.module.scss'

const { getCoinPrice, addTransaction } = TransactionServices
const { getProfileTokens } = AccountServices

export const TransactionForm = (props: ITransactionForm) => {
  const { className, type, fetch } = props

  const [n] = useTranslation('notification')
  const [f] = useTranslation('form')
  const [c] = useTranslation('common')

  const closeHandler = useRef<any>()

  const { tokens } = useTokens()

  const [coinPrice, setCoinPrice] = useState<string | null>()
  const [tokenName, setTokenName] = useState<any>(null)
  const [status, setStatus] = useState<FetchStatusType | null>(null)
  const [data, setData] = useState<TransactionBody | null>(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [myTokens, setMyTokens] = useState<IProfileToken[]>()

  const notifyToken = () => toast.error(n('tokenExit'))
  const notifyAddress = () => toast.error(n('addressExit'))

  const methods = useForm({
    resolver: yupResolver(transactionForm),
  })

  const { handleSubmit, reset, setValue } = methods

  const fetchProfileTokens = async () => {
    try {
      const response = await getProfileTokens()
      setMyTokens(response.data)
    } catch (e) {
      console.log('Error fetch profile tokens', e)
    }
  }

  useEffect(() => {
    if (type === 'Out') {
      fetchProfileTokens()
    }
  }, [])

  const onSubmit = async (_data: any) => {
    if (!coinPrice || !tokenName) {
      return
    }

    setStatus('pending')

    let body = {}

    if (type === 'In') {
      body = {
        amountOut: _data.deposit,
        transactionType: type,
        transactionStatus: 'Process',
        currencyToken: tokenName.label,
        contact: tokenName.value,
        amountIn: (Number(_data.deposit) / Number(coinPrice)).toString(),
      }
    }

    if (type === 'Out') {
      if (!_data.contact) {
        setStatus('error')
        return
      }

      const validateToken =
        tokenName.label === 'TRC20' ? 'Tether' : tokenName.label

      if (!paymentCart[tokenName.label]) {
        if (!WAValidator.validate(_data.contact, validateToken)) {
          setStatus('error')
          notifyAddress()
          return
        }
      }

      body = {
        amountOut: (Number(_data.deposit) / Number(coinPrice)).toString(),
        transactionType: type,
        transactionStatus: 'Process',
        currencyToken: tokenName.label,
        amountIn: _data.deposit,
        contact: _data.contact,
      }
    }

    try {
      const response = await addTransaction(body as IRequestTransaction)
      await fetch()
      setData(response.data)

      if (type === 'In') {
        setOpenPopup(true)
      }

      setStatus('success')
    } catch (e) {
      console.log('Error add transaction', e)
      setStatus('error')
    } finally {
      reset()
    }
  }

  const onSelectToken = async (coin: any) => {
    try {
      // Проверяем, кошелек это или крипта, если кашелек то коэф 1:1
      if (!coin.isPayer) {
        const checkCoin = coin.label === 'TRC20' ? 'TUSD' : coin.label
        const response = await getCoinPrice(checkCoin)
        setCoinPrice(response.data.price)
      } else {
        setCoinPrice('1')
      }

      setTokenName(coin)

      if (type === 'Out') {
        // @ts-ignore
        setValue('contact', coin.value)
      }
    } catch (e) {
      if (tokenName) {
        setTokenName(null)
      }
      notifyToken()
      console.log('Failed get token', e)
    }
  }

  const onClose = () => {
    setData(null)
    setOpenPopup(false)
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className={cn(s.form, className)}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={s.col}>
            {type === 'In' ? (
              <DropDown
                className={cn(s.dropIn)}
                placeholder={f('titleInvest')}
                // @ts-ignore
                onSelectItem={onSelectToken}
                options={
                  tokens
                    ? tokens.map((token) => ({
                        id: token.currencyTypeId,
                        label: token.currencyToken,
                        value: token.value,
                        image: token.image,
                        isPayer: paymentCart[token.currencyToken],
                      }))
                    : []
                }
              />
            ) : (
              <DropDown
                placeholder={f('titleInvest')}
                // @ts-ignore
                onSelectItem={onSelectToken}
                options={
                  myTokens
                    ? myTokens.map((token) => ({
                        id: token.currentTypeId,
                        label: token.currencyToken,
                        value: token.value,
                        image: token.image,
                        isPayer: paymentCart[token.currencyToken],
                      }))
                    : []
                }
              />
            )}
            <div className={s.label}>{f('selectSystemPay')}</div>
          </div>
          <div className={s.col}>
            <Input
              prefix="$"
              className={s.input}
              placeholder={`${type === 'Out' ? f('priceOut') : f('priceIn')}`}
              type="text"
              name="deposit"
            />
            <div className={s.label}>
              {type === 'Out' ? f('priceWriteOut') : f('priceWriteIn')}
            </div>
          </div>
          {type === 'Out' && (
            <div className={s.col}>
              <Input
                className={s.input}
                placeholder={f('addressPlaceholder')}
                type="text"
                name="contact"
              />
              <div className={s.label}>{f('addressLabel')}</div>
            </div>
          )}
          <Button
            className={s.button}
            disabled={status === 'pending'}
            type="submit"
          >
            {type === 'Out' ? c('out') : c('in')}
          </Button>
          {type === 'Out' && (
            <p className={s.notification}>{c('requestMessage')}</p>
          )}
        </form>
      </FormProvider>
      <Modal
        textButton=""
        isOpen={openPopup}
        ref={closeHandler}
        onClose={onClose}
      >
        <div className={s.modal}>
          <button
            className={s.close}
            onClick={() => closeHandler.current()}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path d="M1 1L16 16" stroke="#919191" strokeLinecap="round" />
              <path
                d="M16 1L0.999999 16"
                stroke="#919191"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <TransactionPopup body={data} />
        </div>
      </Modal>
    </>
  )
}
