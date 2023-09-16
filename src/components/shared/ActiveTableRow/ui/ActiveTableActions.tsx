import { useEffect, useState } from 'react'
import cn from 'classnames'

import { clearDate } from 'helpers/clearDate'
import { floorPrice } from 'helpers/floorPrice'

import { IResponseHistory } from 'models/response/ActionResponse'

import {
  TableCell,
  TableComponent,
  TableLabel,
  TableRow,
} from 'components/shared/table'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { Company } from 'components/personal/Company'
import { Loader } from 'components/shared/Loader'

import ActionServices from 'services/ActionServices'

import s from './ActiveTableRow.module.scss'

interface IActiveTableActions {
  name: string
  icon: string
  isOpen: boolean
  code: string
  totalAmount: string
  totalPrice: string
  changeCounter: () => void
}

const SIZE = 8

const { getActionHistory } = ActionServices

export const ActiveTableActions = (props: IActiveTableActions) => {
  const { isOpen, changeCounter, code, name, icon, totalPrice, totalAmount } =
    props

  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false)

  const [data, setData] = useState<IResponseHistory | null>(null)

  useEffect(() => {
    if (isOpenPopup) {
      fetchData()
    } else {
      setData(null)
    }
  }, [isOpenPopup])

  const fetchData = async () => {
    try {
      const response = await getActionHistory({ page: 0, size: SIZE }, code)
      setData(response.data)
    } catch (e) {
      console.log('Error fetch history action', e)
    }
  }

  const fetchNext = async () => {
    if (data && !data.last) {
      try {
        const response = await getActionHistory(
          {
            page: data.number + 1,
            size: SIZE,
          },
          code,
        )
        setData(response.data)
      } catch (e) {
        console.log('Error fetch gain', e)
      }
    }
  }

  const fetchPrev = async () => {
    if (data && !data.first) {
      try {
        const response = await getActionHistory(
          {
            page: data.number - 1,
            size: SIZE,
          },
          code,
        )
        setData(response.data)
      } catch (e) {
        console.log('Error fetch gain', e)
      }
    }
  }

  return (
    <>
      <TableCell className={s.more}>
        <Modal
          className={s.inner}
          textButton="Подробнее"
          isOpen={isOpenPopup}
          onOpen={setIsOpenPopup}
          onClose={setIsOpenPopup}
        >
          <div className={s.modal}>
            <button
              className={s.close}
              onClick={() => setIsOpenPopup(false)}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="11"
                viewBox="0 0 12 11"
                fill="none"
              >
                <path
                  d="M1.10059 0.549805L11.0001 10.4493"
                  stroke="#3E3E3E"
                  strokeLinecap="round"
                />
                <path
                  d="M1.10059 10.4492L11.0001 0.549723"
                  stroke="#3E3E3E"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {!data ? (
              <div className={s.loader}>
                <Loader />
              </div>
            ) : (
              <>
                <div className={s.title}>История покупки акций</div>
                <div className={s.header}>
                  <div className={s.left}>
                    <Company name={name} icon={icon} />
                  </div>
                  <div className={s.right}>
                    <TableLabel
                      label="общая стоимость"
                      value={totalPrice}
                      type="price"
                    />
                    <TableLabel
                      label="Общее кол-во Акций"
                      value={totalAmount}
                      type="num"
                    />
                  </div>
                </div>
                <TableComponent
                  className={s.table}
                  classNameInner={s.tableInner}
                  classNameBody={s.tbody}
                  classNamePagination={s.pagination}
                  tableTitles={[
                    { title: 'Цена покупки' },
                    { title: 'Дата покупки' },
                    { title: 'Кол-во приобретенных акций' },
                    { title: 'Подитог' },
                  ]}
                  tables={data.content}
                  currentPage={data.number}
                  total={data.totalPages}
                  fetchNext={fetchNext}
                  fetchPrev={fetchPrev}
                  renderComponent={(action) => (
                    <TableRow key={action.id}>
                      <TableCell className={s.priceBut}>
                        $ {floorPrice(action.ask)}
                      </TableCell>
                      <TableCell className={s.data}>
                        {clearDate(action.createdDate)}
                      </TableCell>
                      <TableCell className={s.count}>{action.count}</TableCell>
                      <TableCell className={s.totalPrice}>
                        $ {floorPrice(action.amount)}
                      </TableCell>
                    </TableRow>
                  )}
                />
              </>
            )}
          </div>
        </Modal>
      </TableCell>
      <TableCell className={cn(s.action, { [s.isOpen]: isOpen })}>
        <Button className={s.button} type="button" onClick={changeCounter}>
          {isOpen ? 'Подтвердить' : 'Продать'}
        </Button>
      </TableCell>
    </>
  )
}
