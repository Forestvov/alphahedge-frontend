import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import cn from 'classnames'

import {
  TableCell,
  TableComponent,
  TableLabel,
  TablePrice,
  TableRow,
} from 'components/shared/table'
import { Loader } from 'components/shared/Loader'

import { clearDate } from 'helpers/clearDate'

import BriefcaseServices from 'services/BriefcaseServices'
import { IGetGainBriefcaseResponse } from 'models/response/BriefcaseResponse'

import { IIncomeTableCarousel } from '../model/IncomeTableCarousel.interface'

import s from './IncomeTable.module.scss'

const { getGainBriefcase } = BriefcaseServices

export const IncomeTable = forwardRef((props: IIncomeTableCarousel, ref) => {
  const { className, showTotal = true, briefId } = props

  const [data, setData] = useState<IGetGainBriefcaseResponse>()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getGainBriefcase({
        page: 0,
        size: 6,
        criteria: briefId
          ? [
              { key: 'code', value: 'ADVANCED' },
              { key: 'briefcaseaccountid', value: briefId.toString() },
            ]
          : [{ key: 'code', value: 'ADVANCED' }],
      })
      setData(response.data)
    } catch (e) {
      console.log('Error fetch gain', e)
    }
  }

  useImperativeHandle(ref, () => fetchData)

  const fetchNext = async () => {
    if (data && !data.page.last) {
      try {
        const response = await getGainBriefcase({
          page: data.page.number + 1,
          size: 6,
          criteria: briefId
            ? [
                { key: 'code', value: 'ADVANCED' },
                { key: 'briefcaseaccountid', value: briefId.toString() },
              ]
            : [{ key: 'code', value: 'ADVANCED' }],
        })
        setData(response.data)
      } catch (e) {
        console.log('Error fetch gain', e)
      }
    }
  }

  const fetchPrev = async () => {
    if (data && !data.page.first) {
      try {
        const response = await getGainBriefcase({
          page: data.page.number - 1,
          size: 6,
          criteria: briefId
            ? [
                { key: 'code', value: 'ADVANCED' },
                { key: 'briefcaseaccountid', value: briefId.toString() },
              ]
            : [{ key: 'code', value: 'ADVANCED' }],
        })
        setData(response.data)
      } catch (e) {
        console.log('Error fetch gain', e)
      }
    }
  }

  if (!data) {
    return (
      <div className={s.loader}>
        <Loader />
      </div>
    )
  }

  return (
    <div className={cn(s.wrapper, className)}>
      <div className={s.header}>
        <div className={s.title}>Доходы</div>
        {showTotal && (
          <div className={s.total}>
            {data.gainSum && (
              <TableLabel
                label="общее кол-во Доходов"
                value={data.gainSum.toString()}
                type="price"
              />
            )}
            {data.briefcaseCount && (
              <TableLabel
                label="кол-во Активных Портфелей"
                value={data.briefcaseCount.toString()}
                type="num"
              />
            )}
          </div>
        )}
      </div>

      <TableComponent
        className={s.table}
        classNameInner={s.inner}
        tableTitles={[
          { title: 'Объем инвестиций' },
          { title: 'Дата' },
          { title: 'Сумма дохода' },
        ]}
        total={data.page.totalPages}
        currentPage={data.page.number}
        fetchPrev={fetchPrev}
        fetchNext={fetchNext}
        tables={data.page.content}
        renderComponent={(item) => (
          <TableRow key={item.briefcaseId}>
            <TableCell className={s.price}>
              <span>$ {item.briefcaseAmount}</span>
            </TableCell>
            <TableCell className={s.data}>
              {clearDate(item.createdDate)}
            </TableCell>
            <TableCell className={s.cellTotal}>
              <TablePrice price={item.gainAmount.toString()} type="up" />
            </TableCell>
          </TableRow>
        )}
      />
    </div>
  )
})
