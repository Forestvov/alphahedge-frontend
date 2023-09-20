import { useTranslation } from 'react-i18next'

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

  const [c] = useTranslation('common')

  return (
    <TableRow>
      <TableCell className={s.briefName}>
        <div className={s.icon}>
          {code === 'ADVANCED' ? (
            <img
              width="21"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDQiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0NCA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTM4LjE3MDEgMzMuNzQ1N0MzMS44NjY3IDMyLjI5MTQgMjUuOTk3MyAzMS4wMTc1IDI4LjgzODkgMjUuNjUwNEMzNy40OSA5LjM0MDk2IDMxLjEzMjUgMC42MjAxMTcgMjEuOTk4MiAwLjYyMDExN0MxMi42ODI5IDAuNjIwMTE3IDYuNDgxNzEgOS42NzU3MSAxNS4xNTQ5IDI1LjY1MDRDMTguMDgyOCAzMS4wNDc0IDExLjk5MjQgMzIuMzEzIDUuODIzNjUgMzMuNzQ1N0MtMC40NzcwOTMgMzUuMiAwLjAwODY2OTQzIDM0LjM4IDAuMDA4NjY5NDMgNDAuNDA4M0g0My45OTMxQzQzLjk4OCAzNC4zOCA0NC40NzM4IDM1LjIwMDMgMzguMTcwMSAzMy43NDU3SDM4LjE3MDFaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"
              alt="img"
            />
          ) : (
            <img src={image} alt="img" />
          )}
        </div>
        <span>{briefcaseName}</span>
      </TableCell>
      <TableCell className={s.type}>
        {code === 'ADVANCED' ? c('simple') : c('advanced')}
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
