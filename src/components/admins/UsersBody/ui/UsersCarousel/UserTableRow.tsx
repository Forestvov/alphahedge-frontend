import { Link } from 'react-router-dom'

import useGetMainInfo from 'hooks/useGetMainInfo'

import { floorPrice } from 'helpers/floorPrice'

import { IUser } from 'models/IUser'

import { TableCell, TableRow } from 'components/shared/table'
import { TableNameUser } from 'components/admins/TableNameUser'

import { UserStatusChanger } from './UserStatusChanger'

import s from './UsersCarousel.module.scss'

export const UserTableRow = (props: IUser) => {
  const {
    email,
    role,
    userName,
    fio,
    balance,
    accountId,
    status,
    referalAccountId,
    referalAccountUsername,
  } = props

  const getUser = useGetMainInfo()

  const setUserId = async (id: number) => {
    try {
      await localStorage.setItem('Account-Id', id.toString())
      await localStorage.setItem('editor', '1')
      await getUser()
    } catch (e) {
      console.log('Error fetch user', e)
    }
  }

  return (
    <TableRow className={s.row}>
      <TableCell className={s.first}>
        <TableNameUser userId={accountId} name={fio} showType="fullName" />
        {referalAccountId && (
          <div className={s.referal}>
            Зарегистрировался по реф. ссылке от:{' '}
            <Link
              to={`/admin/user/${referalAccountId}/dashboard`}
              onClick={() => setUserId(referalAccountId)}
            >
              {referalAccountUsername}
            </Link>
          </div>
        )}
      </TableCell>
      <TableNameUser
        className={s.username}
        userId={accountId}
        name={userName}
        showType="username"
      />
      <TableCell className={s.email}>{email}</TableCell>
      <TableCell className={s.type}>{role}</TableCell>
      <TableCell>${floorPrice(balance)}</TableCell>
      <UserStatusChanger accountId={accountId} status={status} />
    </TableRow>
  )
}
