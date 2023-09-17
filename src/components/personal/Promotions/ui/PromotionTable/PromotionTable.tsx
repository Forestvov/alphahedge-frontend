import { useEffect } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import { floorPrice } from 'helpers/floorPrice'

import { Loader } from 'components/shared/Loader'
import { TableComponent, TableLabel } from 'components/shared/table'
import { ActiveTableRow } from 'components/shared/ActiveTableRow'

import ActionServices from 'services/ActionServices'

import useActions from 'hooks/useActions'

import s from './PromotionTable.module.scss'

const { getActionBalance } = ActionServices

export const PromotionTable = () => {
  const [p] = useTranslation('panel')

  const { data, setData } = useActions()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await getActionBalance({
        page: 0,
        size: 6,
      })
      setData(response.data)
    } catch (e) {
      console.log('Error fetch action balance', e)
    }
  }

  const fetchNext = async () => {
    if (data && !data.actionAccountBalanceViewDtoPage.last) {
      try {
        const response = await getActionBalance({
          page: data.actionAccountBalanceViewDtoPage.number + 1,
          size: 6,
        })
        setData(response.data)
      } catch (e) {
        console.log('Error fetch gain', e)
      }
    }
  }

  const fetchPrev = async () => {
    if (data && !data.actionAccountBalanceViewDtoPage.first) {
      try {
        const response = await getActionBalance({
          page: data.actionAccountBalanceViewDtoPage.number - 1,
          size: 6,
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
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.left}>{p('packageActionTitle')}</div>
        <div className={s.right}>
          <TableLabel
            label={p('totalPackage')}
            value={floorPrice(data.balance).toString()}
            type="price"
          />
          <TableLabel
            label={p('amountPackage')}
            value={data.countActions.toString()}
            type="num"
          />
        </div>
      </div>

      {data?.countActions === 0 ? (
        <div className={s.empty}>{p('emptyListPackage')}</div>
      ) : (
        <TableComponent
          className={s.table}
          classNameInner={s.inner}
          classNameBody={s.tbody}
          classNamePagination={s.pagination}
          tables={data.actionAccountBalanceViewDtoPage.content}
          currentPage={data.actionAccountBalanceViewDtoPage.number}
          total={data.actionAccountBalanceViewDtoPage.totalPages}
          fetchNext={fetchNext}
          fetchPrev={fetchPrev}
          renderComponent={(action) => (
            <ActiveTableRow
              {...action}
              hideLastBuy
              updateData={fetchData}
              key={action.accountId + action.gain}
              showButton
            />
          )}
          tableTitles={[
            { title: p('nameThead') },
            { title: p('currentPriceThead') },
            { title: p('actionCount') },
            { title: p('totalAmount') },
          ]}
        />
      )}
    </div>
  )
}
