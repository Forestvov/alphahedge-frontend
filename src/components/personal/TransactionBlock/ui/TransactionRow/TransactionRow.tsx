import { useRef } from 'react'
import cn from 'classnames'

import { clearDate } from 'helpers/clearDate'
import { floorPrice } from 'helpers/floorPrice'

import { ITransaction } from 'models/response/TransactionResponse'

import { TableCell, TableRow } from 'components/shared/table'
import { UserName } from 'components/shared/UserName'
import { Modal } from 'components/shared/Modal'

import { TransactionPopup } from '../TransactionPopup/TransactionPopup'

import s from './TransactionRow.module.scss'

export const TransactionRow = (props: ITransaction) => {
  const {
    transactionDate,
    transactionStatus,
    currencyToken,
    transactionId,
    fio,
    transactionType,
    amount,
  } = props

  const closeHandler = useRef<any>()

  return (
    <TableRow>
      <TableCell className={s.first}>
        <UserName name={fio} />
        <span className={s.price}>${floorPrice(amount)}</span>
      </TableCell>
      <TableCell className={s.type}>
        <span>{currencyToken}</span>
      </TableCell>
      <TableCell className={s.data}>
        <span>{clearDate(transactionDate, true)}</span>
      </TableCell>
      <TableCell>
        {transactionStatus === 'Process' && transactionType === 'In' ? (
          <Modal
            classNameButton={cn(s.status, s.pending, s.disable)}
            textButton="В обработке"
            ref={closeHandler}
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
              <TransactionPopup transactionId={transactionId} />
            </div>
          </Modal>
        ) : (
          <button
            className={cn(s.status, {
              [s.success]: transactionStatus === 'Success',
              [s.cancel]: transactionStatus === 'Canceled',
              [s.pending]: transactionStatus === 'Process',
            })}
            disabled
            type="button"
          >
            {transactionStatus === 'Success' && 'Успешно'}
            {transactionStatus === 'Canceled' && 'Отменен'}
            {transactionStatus === 'Process' && 'В обработке'}
          </button>
        )}
      </TableCell>
    </TableRow>
  )
}
