import { useEffect, useState } from 'react'

import { floorPrice } from 'helpers/floorPrice'

import { QrIcon } from 'assets/images'

import TransactionServices from 'services/TransactionServices'

import { TransactionBody } from 'models/IToken'

import { Loader } from 'components/shared/Loader'

import { TransactionPopupTimer } from './TransactionPopupTimer'

import s from './TransactionPopup.module.scss'

const { getTransactionBody } = TransactionServices

export const TransactionPopup = () => {
  const [data, setData] = useState<TransactionBody>()

  const fetchData = async () => {
    try {
      const response = await getTransactionBody(64)
      setData(response.data)
    } catch (e) {
      console.log('Error fetch transaction', e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={s.body}>
      {!data ? (
        <div className={s.loader}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={s.main}>
            <h2 className={s.title}>
              Pay For
              <div className={s.color}>Your Order</div>
            </h2>
            <p className={s.text}>
              Please complete the order within the time indicated below,
              otherwise it will be cancelled.
            </p>
            <img className={s.code} src={QrIcon} alt="qr_code" />
            <div className={s.row}>
              <div className={s.value}>672.218 USDT</div>
              <div className={s.notification}>
                Amount <span className={s.circle}>!</span>
                <span className={s.selected}>
                  {' '}
                  Selected network : {data.currencyToken}
                </span>
              </div>
            </div>

            <div className={s.row}>
              <div className={s.value}>
                <div className={s.address}>
                  0xb786ef7c38b70127aee856710dd91eadcd9d86eaaf267185cc9fa627c33e8eaa...
                </div>
              </div>
              <div className={s.notification}>Adress</div>
            </div>

            <p className={s.transaction}>
              Transaction sent from an exchange might fail.
            </p>
          </div>
          <div className={s.bottom}>
            <div className={s.left}>
              <div className={s.site}>
                www.alphahedge-holdings.com {floorPrice(data.amount)} USD
              </div>
              <div className={s.total}>672.218 USDT</div>
            </div>
            <div className={s.right}>
              <TransactionPopupTimer />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
