import { IUser } from 'models/IUser'

import { TableComponent } from 'components/shared/table'

import { UserTableRow } from './UserTableRow'

import s from './UsersCarousel.module.scss'

interface IUsersCarousel {
  number: number
  totalPages: number
  content: IUser[]
  fetchPrev: () => Promise<void>
  fetchNext: () => Promise<void>
}

export const UsersCarousel = (props: IUsersCarousel) => {
  const { number, totalPages, content, fetchNext, fetchPrev } = props

  return (
    <TableComponent
      className={s.table}
      classNameInner={s.inner}
      tableTitles={[
        { title: 'ФИО Пользователя' },
        { title: 'Username' },
        { title: 'E-mail' },
        { title: 'Роль' },
        {
          title: 'Баланс',
          sortField: 'balance',
        },
        { title: 'Действия' },
      ]}
      currentPage={number}
      total={totalPages}
      fetchNext={fetchNext}
      fetchPrev={fetchPrev}
      tables={content}
      renderComponent={(user) => (
        <UserTableRow key={user.accountId} {...user} />
      )}
    />
  )
}
