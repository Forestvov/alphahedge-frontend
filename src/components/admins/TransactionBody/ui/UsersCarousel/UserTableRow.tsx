import { clearDate } from 'helpers/clearDate'

import { ITransaction } from 'models/response/TransactionResponse'
import AdminService from 'services/AdminService'

import { TableCell, TableRow } from 'components/shared/table'
import { ChangeStatus } from 'components/admins/ChangeStatus'

import { TableNameUser } from 'components/admins/TableNameUser'

import { UserTablePriceChanger } from './UserTablePriceChanger'

import s from './UsersCarousel.module.scss'

interface IUserTableRow extends ITransaction {
  updateData: () => Promise<void>
}

const { editStatusTransaction } = AdminService

export const UserTableRow = (props: IUserTableRow) => {
  const {
    fio,
    amount,
    transactionStatus,
    transactionDate,
    transactionId,
    username,
    currencyToken,
    accountId,
    transactionType,
    updateData,
  } = props

  return (
    <TableRow className={s.row}>
      <TableNameUser
        className={s.fullname}
        userId={accountId}
        name={fio}
        showType="fullName"
      />
      <TableNameUser
        className={s.username}
        userId={accountId}
        name={username}
        showType="username"
      />
      <TableCell className={s.date}>
        {clearDate(transactionDate, true)}
      </TableCell>
      <TableCell className={s.type}>{currencyToken}</TableCell>
      <UserTablePriceChanger
        id={transactionId}
        currentStatus={transactionStatus}
        amount={amount}
        transactionType={transactionType}
        updateData={updateData}
        hideEdit={
          transactionStatus === 'Success' || transactionStatus === 'Canceled'
        }
      />
      <TableCell className={s.change}>
        <ChangeStatus
          id={transactionId}
          changeStatus={(id, status) =>
            editStatusTransaction(id, status, transactionType, amount)
          }
          updateData={updateData}
          processKey="Process"
          successKey="Success"
          cancelKey="Canceled"
          status={transactionStatus}
        />
      </TableCell>
    </TableRow>
  )
}
