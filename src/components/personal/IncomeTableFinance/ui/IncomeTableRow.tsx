import { TableCell, TablePrice, TableRow } from 'components/shared/table'

import { clearDate } from 'helpers/clearDate'
import { floorPrice } from 'helpers/floorPrice'

import { IGainItem } from 'models/response/BriefcaseResponse'

import s from './IncomeTableFinance.module.scss'

export const IncomeTableRow = (props: IGainItem) => {
  const {
    briefcaseAmount,
    briefcaseName,
    gainAmount,
    code,
    createdDate,
    image,
  } = props

  return (
    <TableRow>
      <TableCell className={s.briefName}>
        <div className={s.icon}>
          <img src={image} alt="img" />
        </div>
        <span>{briefcaseName}</span>
      </TableCell>
      <TableCell className={s.type}>
        {code === 'ADVANCED' ? 'Индвидуальный' : 'Портфельные'}
      </TableCell>
      <TableCell className={s.price}>
        <span>$ {briefcaseAmount}</span>
      </TableCell>
      <TableCell className={s.data}>{clearDate(createdDate)}</TableCell>
      <TableCell className={s.cellTotal}>
        <TablePrice price={floorPrice(gainAmount).toString()} type="up" />
      </TableCell>
    </TableRow>
  )
}
