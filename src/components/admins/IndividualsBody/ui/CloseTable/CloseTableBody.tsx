import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import queryString from 'query-string'

import useAdvanceCounter from 'hooks/useAdvanceCounter'
import { IAdvancedResponse } from 'models/response/AdminResponse'
import useIndividualContext from 'hooks/useIndividualContext'

import { TableComponent } from 'components/shared/table'

import { Loader } from 'components/shared/Loader'
import AdminService from 'services/AdminService'

import { CloseTableRow } from './CloseTableRow'
import { CloseTableForm } from './CloseTableForm'

import s from './CloseTable.module.scss'

const SIZE = 20

const { getAdvanced } = AdminService

export const CloseTableBody = () => {
  const { setAdvancedCard } = useIndividualContext()
  const { setCounter } = useAdvanceCounter()

  const [searchParams, setSearchParams] = useSearchParams()

  const [users, setUsers] = useState<IAdvancedResponse>()

  useEffect(() => {
    fetchUsers()
  }, [searchParams])

  const fetchUsers = async (): Promise<void> => {
    const qs = queryString.parse(searchParams.toString())
    const page = searchParams.get('page')
    const statusSearch = searchParams.get('briefcaseAccountOrderToCloseStatus')
    delete qs.page

    const criteria: { key: string; value: string }[] = Object.keys(qs).map(
      (key) => ({
        key,
        value: qs[key] as string,
      }),
    )

    console.log(statusSearch)

    try {
      const response = await getAdvanced({
        size: SIZE,
        page: page ? Number(page) : 0,
        sortField: 'createddate',
        sortDir: 'DESC',
        criteria: [
          { key: 'briefcaseCode', value: 'ADVANCED' },
          {
            key: 'briefcaseAccountOrderToCloseStatus',
            value: !statusSearch ? 'Process' : (statusSearch as string),
          },
          ...criteria,
        ],
      })
      setUsers(response.data)
      setCounter({ active: null, close: response.data.totalElements })
    } catch (e) {
      console.log('Error fetch users', e)
    }
  }

  const fetchNext = async () => {
    if (users && !users.last) {
      try {
        searchParams.set('page', `${users.number + 1}`)
        setSearchParams(searchParams)
      } catch (e) {
        console.log('Error fetch users', e)
      }
    }
  }

  const fetchPrev = async () => {
    if (users && !users.first) {
      try {
        searchParams.set('page', `${users.number - 1}`)
        setSearchParams(searchParams)
      } catch (e) {
        console.log('Error fetch users', e)
      }
    }
  }

  return (
    <>
      <CloseTableForm />
      {!users ? (
        <div className={s.loader}>
          <Loader />
        </div>
      ) : (
        <TableComponent
          classNameWrapper={s.wrapper}
          classNameInner={s.inner}
          classNameHeader={s.head}
          className={s.table}
          classNameBody={s.tbody}
          tables={users.content}
          currentPage={users.number}
          total={users.totalPages}
          fetchNext={fetchNext}
          fetchPrev={fetchPrev}
          renderComponent={(item) => (
            <CloseTableRow
              key={item.briefcaseAccountId}
              updateData={fetchUsers}
              {...item}
              onClick={(value, briefId) =>
                setAdvancedCard({ userId: value, briefId })
              }
            />
          )}
          tableTitles={[
            { title: 'ФИО Пользователя' },
            { title: 'Username' },
            { title: 'Дата открытия' },
            { title: 'Сумма вложений' },
            { title: 'Статус' },
          ]}
        />
      )}
    </>
  )
}
