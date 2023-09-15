import { useState } from 'react'
import cn from 'classnames'
import { toast } from 'react-toastify'

import { TableCell, TablePrice, TableRow } from 'components/shared/table'
import { CounterChanger } from 'components/shared/CounterChanger'
import { Company } from 'components/personal/Company'

import useGetMainInfo from 'hooks/useGetMainInfo'

import ActionServices from 'services/ActionServices'

import { floorPrice } from 'helpers/floorPrice'

import { IActiveTableRow } from '../model/ActiveTableRow.interface'

import { ActiveTableActions } from './ActiveTableActions'

import s from './ActiveTableRow.module.scss'

const { actionSell } = ActionServices

export const ActiveTableRow = (props: IActiveTableRow) => {
  const {
    hideLastBuy = false,
    showButton = false,
    code,
    count,
    currentAmountAll,
    currentPrice,
    gain,
    image,
    updateData = () => null,
  } = props

  const [sellCounter, setSellCounter] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  const notifySuccess = () => toast.success('Вы продали данную акцию')

  const updateUser = useGetMainInfo()

  const changeCounter = async () => {
    if (!isOpen) {
      setIsOpen(true)
      return
    }

    try {
      await actionSell({ code, count: sellCounter.toString() })
      await updateData()
      await updateUser()
      notifySuccess()
    } catch (e) {
      console.log('Error sell action', e)
    }
  }

  const incrementHandler = () => {
    if (count > sellCounter) {
      setSellCounter((prevState) => prevState + 1)
    }
  }

  const decrementCounter = () => {
    if (sellCounter > 1) {
      setSellCounter((prevState) => prevState - 1)
    }
  }

  return (
    <>
      <TableRow className={cn({ [s.borderHide]: isOpen })}>
        <TableCell className={cn(s.company, { [s.md]: showButton })}>
          <Company name={code} icon={image} />
        </TableCell>
        {!hideLastBuy && (
          <TableCell className={cn(s.price, { [s.md]: showButton })}>
            {/* <Price type="xs" price="1753.00" /> */}
          </TableCell>
        )}
        <TableCell>
          <TablePrice
            price={currentPrice.toString()}
            type={gain > 0 ? 'up' : 'down'}
          />
        </TableCell>
        <TableCell className={cn(s.actions, { [s.md]: showButton })}>
          {count}
        </TableCell>
        <TableCell>
          <TablePrice
            price={floorPrice(currentAmountAll).toString()}
            type="up"
          />
        </TableCell>
        {showButton && (
          <ActiveTableActions
            totalAmount={count.toString()}
            totalPrice={floorPrice(currentAmountAll).toString()}
            icon={image}
            name={code}
            isOpen={isOpen}
            code={code}
            changeCounter={changeCounter}
          />
        )}
      </TableRow>
      <TableRow className={cn(s.counter, { [s.show]: isOpen })}>
        <TableCell className={s.label}>
          <span>Выберите кол-во акций :</span>
        </TableCell>
        <TableCell className={s.changer}>
          <CounterChanger
            value={sellCounter}
            increment={incrementHandler}
            decrement={decrementCounter}
          />
        </TableCell>
      </TableRow>
    </>
  )
}
