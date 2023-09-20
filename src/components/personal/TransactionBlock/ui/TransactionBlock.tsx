import { useEffect, useState } from 'react'
import { ITransactionHistory } from 'models/response/TransactionResponse'
import TransactionServices from 'services/TransactionServices'
import { FinanceReplenishment } from 'components/personal/FinanceBody/ui/FinanceReplenishment'
import { FinanceDerivation } from 'components/personal/FinanceBody/ui/FinanceDerivation'

import { ITransactionBlock } from '../model/Transaction.interface'

import { TransactionForm } from './TransactionForm/TransactionForm'

const { getHistoryList } = TransactionServices

export const TransactionBlock = (props: ITransactionBlock) => {
  const { className, type } = props

  const [data, setData] = useState<ITransactionHistory>()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getHistoryList({
        size: 4,
        page: 0,
        sortDir: 'DESC',
        sortField: 'transactionDate',
        criteria: [{ key: 'transactionType', value: type }],
      })
      setData(response.data)
    } catch (e) {
      console.log('Error fetch history', e)
    }
  }

  const fetchNext = async () => {
    if (data && !data.last) {
      try {
        const response = await getHistoryList({
          page: data.number + 1,
          size: 4,
          sortDir: 'DESC',
          sortField: 'transactionDate',
          criteria: [{ key: 'transactionType', value: type }],
        })
        setData(response.data)
      } catch (e) {
        console.log('Error fetch gain', e)
      }
    }
  }

  const fetchPrev = async () => {
    if (data && !data.first) {
      try {
        const response = await getHistoryList({
          page: data.number - 1,
          size: 4,
          sortDir: 'DESC',
          sortField: 'transactionDate',
          criteria: [{ key: 'transactionType', value: type }],
        })
        setData(response.data)
      } catch (e) {
        console.log('Error fetch gain', e)
      }
    }
  }

  return (
    <>
      <TransactionForm className={className} fetch={fetchData} type={type} />
      {type === 'In' ? (
        <FinanceReplenishment
          data={data}
          fetchPrev={fetchPrev}
          fetchNext={fetchNext}
        />
      ) : (
        <FinanceDerivation
          data={data}
          fetchPrev={fetchPrev}
          fetchNext={fetchNext}
        />
      )}
    </>
  )
}
