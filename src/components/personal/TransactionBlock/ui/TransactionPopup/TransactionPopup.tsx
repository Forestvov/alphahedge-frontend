import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { floorPrice } from 'helpers/floorPrice'

import TransactionServices from 'services/TransactionServices'

import { TransactionBody } from 'models/IToken'

import { Loader } from 'components/shared/Loader'

import { paymentCart } from '../../lib/paymentCart'

import { TransactionPopupTimer } from './TransactionPopupTimer'
import { TransactionPopupContact } from './TransactionPopupContact'

import s from './TransactionPopup.module.scss'

const { getTransactionBody, getCoinPrice } = TransactionServices

interface ITransactionPopup {
  transactionId?: number
  body?: TransactionBody | null
}

const coins: any = {
  TRC20: 'USDT',
  BTC: 'BTC',
  ETH: 'ETH',
  LTC: 'LTC',
  PM: 'USD',
  Payeer: 'USD',
}

function coinPrice(e: number) {
  return e % 1 === 0 ? e.toFixed(0) : e.toFixed(6)
}

export const TransactionPopup = (props: ITransactionPopup) => {
  const { transactionId, body } = props

  const [t] = useTranslation('transactionPopup')

  const [data, setData] = useState<TransactionBody | null>(body ?? null)
  const [total, setTotal] = useState<number>()

  const fetchData = async (id: number) => {
    try {
      const response = await getTransactionBody(id)
      setData(response.data)
      // если это кашелек, то кооэф не считаем - 1:1
      if (!paymentCart[response.data.currencyToken]) {
        const tokenPrice = await getCoinPrice(
          response.data.currencyToken === 'TRC20'
            ? 'TUSD'
            : response.data.currencyToken,
        )
        setTotal(response.data.amount / Number(tokenPrice.data.price))
      } else {
        setTotal(response.data.amount)
      }
    } catch (e) {
      console.log('Error fetch transaction', e)
    }
  }

  const setTokenPrice = async () => {
    if (!body) return

    // после оплаты открывается попап где считает токен по апи бинанса либо коэф 1-1 (кашель)
    if (!paymentCart[body.currencyToken]) {
      const token = body.currencyToken === 'TRC20' ? 'TUSD' : body.currencyToken
      const tokenPrice = await getCoinPrice(token)
      setTotal(body.amount / Number(tokenPrice.data.price))
    } else {
      setTotal(body.amount)
    }
  }

  useEffect(() => {
    if (transactionId && !body) {
      fetchData(transactionId)
      return
    }

    if (body) {
      setTokenPrice()
    }
  }, [transactionId])

  return (
    <>
      {!data ? (
        <Loader className={s.loader} />
      ) : (
        <>
          <div className={s.main}>
            <h2 className={s.title}>
              {t('title')}
              <div className={s.color}>{t('subTitle')}</div>
            </h2>
            <p className={s.text}>{t('text')}</p>
            <img className={s.code} src={data.qrCode} alt="qr_code" />

            <div className={s.row}>
              <div className={s.value}>
                <span>{coinPrice(Number(total))}</span>{' '}
                {coins[data.currencyToken]}
              </div>
              <div className={s.notification}>
                {t('amount')} <span className={s.circle}>!</span>
                <span className={s.selected}>
                  {t('selected')} : {data.currencyToken}
                </span>
              </div>
            </div>

            <TransactionPopupContact contact={data.contact} />

            <p className={s.transaction}>{t('transaction')}</p>
          </div>

          <div className={s.bottom}>
            <div className={s.left}>
              <div className={s.site}>
                www.alphahedge-holdings.com {floorPrice(data.amount)} USD
              </div>
              <div className={s.total}>
                {coinPrice(Number(total))} {coins[data.currencyToken]}
              </div>
            </div>
            <div className={s.right}>
              <TransactionPopupTimer
                timestamp={data.transactionDate}
                setStatus={() => console.log('change')}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}
