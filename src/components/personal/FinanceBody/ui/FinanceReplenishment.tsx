import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import { TransactionRow } from 'components/personal/TransactionBlock/ui/TransactionRow/TransactionRow'
import { TableComponent } from 'components/shared/table'
import { Loader } from 'components/shared/Loader'

import { IFinanceBody } from '../model/FinanceBody'

import s from './FinanceBody.module.scss'

export const FinanceReplenishment = (props: IFinanceBody) => {
  const { data, fetchPrev, fetchNext } = props

  const [c] = useTranslation('common')

  if (!data) {
    return (
      <div className={s.loader}>
        <Loader />
      </div>
    )
  }

  return data && !data.empty ? (
    <TableComponent
      classNameWrapper={s.wrapper}
      classNameInner={cn(s.inner, s.md)}
      classNameHeader={s.head}
      className={s.table}
      classNameBody={s.tbody}
      classNamePagination={cn(s.pagination, s.md)}
      tables={data.content}
      currentPage={data.number}
      total={data.totalPages}
      fetchNext={fetchNext}
      fetchPrev={fetchPrev}
      renderComponent={(item) => (
        <TransactionRow {...item} key={item.transactionId} />
      )}
      tableTitles={[{ title: c('historyIn') }]}
    />
  ) : (
    <div />
  )
}
