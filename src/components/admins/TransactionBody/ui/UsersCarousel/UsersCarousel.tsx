import { ITransactionHistory } from 'models/response/TransactionResponse'

import { TableComponent } from 'components/shared/table'

import { UserTableRow } from './UserTableRow'

import s from './UsersCarousel.module.scss'

interface IUsersCarousel extends ITransactionHistory {
  fetchNext: () => Promise<void>
  fetchPrev: () => Promise<void>
  updateData: () => Promise<void>
}

export const UsersCarousel = (props: IUsersCarousel) => {
  const { content, number, totalPages, fetchNext, fetchPrev, updateData } =
    props

  return (
    <TableComponent
      className={s.table}
      classNameInner={s.inner}
      tableTitles={[
        { title: 'ФИО Пользователя' },
        { title: 'Username' },
        { title: 'Кошелек' },
        { title: 'Дата', sortField: 'transactionDate' },
        { title: 'Сеть' },
        { title: 'Сумма' },
        { title: 'Статус' },
      ]}
      tables={content}
      currentPage={number}
      total={totalPages}
      fetchNext={fetchNext}
      fetchPrev={fetchPrev}
      renderComponent={(item) => (
        <UserTableRow
          key={item.transactionId}
          updateData={updateData}
          {...item}
        />
      )}
    />
  )
}
