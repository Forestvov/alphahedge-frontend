import { TableComponent } from 'components/shared/table'

import { UserTableRow } from './UserTableRow'

import s from './UsersCarousel.module.scss'

const mockArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

export const UsersCarousel = () => (
  <TableComponent
    className={s.table}
    classNameInner={s.inner}
    tableTitles={[
      { title: 'ФИО Пользователя' },
      { title: 'Username' },
      { title: 'Дата' },
      { title: 'Сеть' },
      { title: 'Сумма' },
      { title: 'Статус' },
    ]}
    currentPage={1}
    total={10}
    fetchNext={() => null}
    fetchPrev={() => null}
    tables={mockArr}
    renderComponent={(item) => <UserTableRow key={item} />}
  />
)
