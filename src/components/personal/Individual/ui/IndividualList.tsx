import { useEffect, useState } from 'react'

import { IndividualCard } from 'components/shared/IndividualCard'
import { Loader } from 'components/shared/Loader'

import { IBriefcaseActive } from 'models/response/BriefcaseResponse'
import useInvestCounter from 'hooks/useInvestCounter'

import BriefcaseServices from 'services/BriefcaseServices'

import s from './Individual.module.scss'

const { getBriefcase } = BriefcaseServices

export const IndividualList = () => {
  const [data, setData] = useState<IBriefcaseActive[] | null>()

  const { setCounter } = useInvestCounter()

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    try {
      const response = await getBriefcase({
        page: 0,
        size: 20,
        criteria: [
          { key: 'briefcaseCode', value: 'ADVANCED' },
          { key: 'briefcaseAccountStatus', value: 'Active' },
        ],
      })
      setData(response.data.content)
      setCounter({
        simple: null,
        actions: null,
        advanced: response.data.totalElements,
      })
    } catch (e) {
      console.log('error individualList', e)
    }
  }

  if (!data) {
    return (
      <div className={s.loader}>
        <Loader />
      </div>
    )
  }

  return (
    <div className={s.right}>
      {data.map((card, idx) => (
        <IndividualCard key={idx} fetch={getList} {...card} />
      ))}
    </div>
  )
}
