import { TableComponent } from 'components/shared/table'

import { IVerification } from 'models/response/AdminResponse'

import { UserTableRow } from './UserTableRow'

import s from './UsersCarousel.module.scss'

export interface IUsersCarousel {
  number: number
  totalPages: number
  content: IVerification[]
  fetchPrev: () => Promise<void>
  fetchNext: () => Promise<void>
  updateData: () => Promise<void>
}

export const UsersCarousel = (props: IUsersCarousel) => {
  const { number, totalPages, content, fetchNext, fetchPrev, updateData } =
    props

  return (
    <TableComponent
      className={s.table}
      classNameInner={s.inner}
      tableTitles={[
        { title: 'ФИО Пользователя' },
        { title: 'Username' },
        { title: 'Фото' },
        { title: 'Дата верификации', sortField: 'registeredDate' },
        { title: 'Статус' },
      ]}
      currentPage={number}
      total={totalPages}
      fetchNext={fetchNext}
      fetchPrev={fetchPrev}
      tables={content}
      renderComponent={(user) => (
        <UserTableRow {...user} updateData={updateData} key={user.accountId} />
      )}
    />
  )
}
