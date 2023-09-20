import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import { floorPrice } from 'helpers/floorPrice'

import { QrIcon } from 'assets/images'

import TransactionServices from 'services/TransactionServices'

import { TransactionBody } from 'models/IToken'

import { Loader } from 'components/shared/Loader'

import { TransactionPopupTimer } from './TransactionPopupTimer'

import s from './TransactionPopup.module.scss'

const { getTransactionBody, getCoinPrice } = TransactionServices

interface ITransactionPopup {
  transactionId?: number
  body?: TransactionBody | null
}

export const TransactionPopup = (props: ITransactionPopup) => {
  const { transactionId, body } = props

  const [c] = useTranslation('common')
  const [t] = useTranslation('transactionPopup')

  const [data, setData] = useState<TransactionBody | null>(body ?? null)
  const [total, setTotal] = useState<number>()

  const fetchData = async (id: number) => {
    try {
      const response = await getTransactionBody(id)
      const tokenPrice = await getCoinPrice(
        response.data.currencyToken === 'TRC20'
          ? 'TUSD'
          : response.data.currencyToken,
      )
      setData(response.data)
      setTotal(response.data.amount / Number(tokenPrice.data.price))
    } catch (e) {
      console.log('Error fetch transaction', e)
    }
  }

  const setTokenPrice = async () => {
    if (body) {
      const tokenPrice = await getCoinPrice(
        body.currencyToken === 'TRC20' ? 'TUSD' : body.currencyToken,
      )
      setTotal(body.amount / Number(tokenPrice.data.price))
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

  const notifySuccess = () => toast.success(c('copyAddress'))

  const copyHandler = (text: string) => {
    navigator.clipboard.writeText(text)
    notifySuccess()
  }

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
            <img className={s.code} src={QrIcon} alt="qr_code" />
            <div className={s.row}>
              <div className={s.value}>
                <span>{floorPrice(Number(total), 1000000)}</span>{' '}
                {data.currencyToken}
              </div>
              <div className={s.notification}>
                {t('amount')} <span className={s.circle}>!</span>
                <span className={s.selected}>
                  {t('selected')} : {data.currencyToken}
                </span>
              </div>
            </div>

            <div className={s.row}>
              <div className={s.value}>
                <div className={s.address}>
                  <span>{data.contact}</span>...
                  {data.contact && (
                    <button
                      type="button"
                      onClick={() => copyHandler(data.contact)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="20"
                        viewBox="0 0 17 20"
                        fill="none"
                      >
                        <path
                          d="M10.5859 20H3.125C1.40184 20 0 18.5982 0 16.875V6.28906C0 4.5659 1.40184 3.16406 3.125 3.16406H10.5859C12.3091 3.16406 13.7109 4.5659 13.7109 6.28906V16.875C13.7109 18.5982 12.3091 20 10.5859 20ZM3.125 4.72656C2.26348 4.72656 1.5625 5.42754 1.5625 6.28906V16.875C1.5625 17.7365 2.26348 18.4375 3.125 18.4375H10.5859C11.4475 18.4375 12.1484 17.7365 12.1484 16.875V6.28906C12.1484 5.42754 11.4475 4.72656 10.5859 4.72656H3.125ZM16.8359 14.9219V3.125C16.8359 1.40184 15.4341 0 13.7109 0H5.03906C4.60754 0 4.25781 0.349727 4.25781 0.78125C4.25781 1.21277 4.60754 1.5625 5.03906 1.5625H13.7109C14.5725 1.5625 15.2734 2.26348 15.2734 3.125V14.9219C15.2734 15.3534 15.6232 15.7031 16.0547 15.7031C16.4862 15.7031 16.8359 15.3534 16.8359 14.9219Z"
                          fill="black"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <div className={s.notification}>{t('address')}</div>
            </div>

            <p className={s.transaction}>{t('transaction')}</p>
          </div>
          <div className={s.bottom}>
            <div className={s.left}>
              <div className={s.site}>
                www.alphahedge-holdings.com {floorPrice(data.amount)} USD
              </div>
              <div className={s.total}>
                {floorPrice(Number(total), 1000000)} {data.currencyToken}
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
