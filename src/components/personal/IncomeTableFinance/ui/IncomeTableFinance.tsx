import { useEffect, useState } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import { TableComponent, TableLabel } from 'components/shared/table'
import { Loader } from 'components/shared/Loader'

import BriefcaseServices from 'services/BriefcaseServices'
import { IGetGainBriefcaseResponse } from 'models/response/BriefcaseResponse'

import { IIncomeTableCarousel } from '../model/IncomeTableCarousel.interface'

import { IncomeTableRow } from './IncomeTableRow'

import s from './IncomeTableFinance.module.scss'

const { getGainBriefcase } = BriefcaseServices

export const IncomeTableFinance = (props: IIncomeTableCarousel) => {
  const { className, showTotal = true } = props

  const [c] = useTranslation('common')
  const [p] = useTranslation('panel')

  const [data, setData] = useState<IGetGainBriefcaseResponse>()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getGainBriefcase({
        page: 0,
        size: 6,
      })
      setData(response.data)
    } catch (e) {
      console.log('Error fetch gain', e)
    }
  }

  const fetchNext = async () => {
    if (data && !data.page.last) {
      try {
        const response = await getGainBriefcase({
          page: data.page.number + 1,
          size: 6,
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
        })
        setData(response.data)
      } catch (e) {
        console.log('Error fetch gain', e)
      }
    }
  }

  return (
    <div className={cn(s.wrapper, className)}>
      <div className={s.header}>
        <div className={s.title}>{p('incomeHead')}</div>

        {!data ? (
          <div />
        ) : (
          <>
            {showTotal && (
              <div className={s.total}>
                {data.gainSum && (
                  <TableLabel
                    label={p('incomeTotal')}
                    value={data.gainSum.toString()}
                    type="price"
                  />
                )}
                {data.briefcaseCount && (
                  <TableLabel
                    label={p('incomeCount')}
                    value={data.briefcaseCount.toString()}
                    type="num"
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>

      {!data ? (
        <div className={s.loader}>
          <Loader />
        </div>
      ) : (
        <TableComponent
          className={s.table}
          classNameInner={s.inner}
          tableTitles={[
            { title: c('package') },
            { title: c('typePackage') },
            { title: c('total') },
            { title: c('date') },
            { title: c('totalAmount') },
          ]}
          total={data.page.totalPages}
          currentPage={data.page.number}
          fetchPrev={fetchPrev}
          fetchNext={fetchNext}
          tables={data.page.content}
          renderComponent={(item) => (
            <IncomeTableRow key={item.briefcaseAccountGainId} {...item} />
          )}
        />
      )}
    </div>
  )
}
