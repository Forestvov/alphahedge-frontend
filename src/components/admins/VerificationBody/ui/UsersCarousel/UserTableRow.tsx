import { IVerification } from 'models/response/AdminResponse'

import AdminService from 'services/AdminService'

import { clearDate } from 'helpers/clearDate'

import { TableCell, TableRow } from 'components/shared/table'
import { TableNameUser } from 'components/admins/TableNameUser'
import { ChangeStatus } from 'components/admins/ChangeStatus'

import { UserTableRowImage } from './UserTableRowImage'

import s from './UsersCarousel.module.scss'

export interface IUserTableRow extends IVerification {
  updateData: () => Promise<void>
}

const { updateVerification } = AdminService

export const UserTableRow = (props: IUserTableRow) => {
  const {
    fio,
    verifiedStatus,
    userName,
    registeredDate,
    accountId,
    files,
    updateData,
  } = props

  return (
    <TableRow className={s.row}>
      <TableNameUser
        className={s.fullName}
        userId={accountId}
        name={fio}
        showType="fullName"
      />
      <TableNameUser
        className={s.username}
        userId={accountId}
        name={userName}
        showType="username"
      />
      <TableCell className={s.photo}>
        {files.slice(-2).map((item) => (
          <UserTableRowImage id={item} key={item} />
        ))}
      </TableCell>
      <TableCell className={s.date}>{clearDate(registeredDate)}</TableCell>
      <TableCell className={s.status}>
        <ChangeStatus
          id={accountId}
          status={verifiedStatus}
          changeStatus={updateVerification}
          updateData={updateData}
          processKey="Process"
          successKey="Verified"
          cancelKey="Canceled"
          notVerifiedEmail="Not verified email"
          notVerifiedYC="Not verified YC"
        />
      </TableCell>
    </TableRow>
  )
}
