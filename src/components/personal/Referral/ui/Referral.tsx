import { useEffect, useState } from 'react'
import cn from 'classnames'

import { TableComponent } from 'components/shared/table'
import { Loader } from 'components/shared/Loader'

import ReferalService from 'services/ReferalService'
import { IReferalResponse } from 'models/response/ReferalResponse'

import { ReferralHeader } from './ReferralHeader'
import { ReferralItem } from './ReferralItem'

import s from './Referral.module.scss'
import { useTranslation } from 'react-i18next'

const { geReferal } = ReferalService

export const Referral = () => {
  const [p] = useTranslation('panel')

  const [data, setData] = useState<IReferalResponse | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await geReferal({
        page: 0,
        size: 7,
      })
      setData(response.data)
    } catch (e) {
      console.log('Error fetch referal', e)
    }
  }

  const fetchNext = async () => {
    if (data && !data.page.last) {
      try {
        const response = await geReferal({
          page: data.page.number + 1,
          size: 7,
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
        const response = await geReferal({
          page: data.page.number - 1,
          size: 7,
        })
        setData(response.data)
      } catch (e) {
        console.log('Error fetch gain', e)
      }
    }
  }

  if (!data) {
    return (
      <div className={cn(s.wrapper, s.pending)}>
        <Loader className={s.loader} />
      </div>
    )
  }

  return (
    <div className={s.referral}>
      <ReferralHeader
        count={data.sumCount}
        total={data.sumAmount}
        referal={data.inviteUrl}
      />
      {data.page.empty ? (
        <div className={s.empty}>{p('emptyReferal')}</div>
      ) : (
        <TableComponent
          className={s.table}
          classNameInner={s.inner}
          classNameWrapper={s.wrapper}
          classNameHeader={s.theader}
          classNameBody={s.tbody}
          classNamePagination={s.pagination}
          tables={data.page.content}
          currentPage={data.page.number}
          total={data.page.totalPages}
          fetchNext={fetchNext}
          fetchPrev={fetchPrev}
          renderComponent={(referal) => (
            <ReferralItem
              key={`${referal.parentId},${referal.accountId}`}
              {...referal}
            />
          )}
          tableTitles={[]}
        />
      )}
    </div>
  )
}
