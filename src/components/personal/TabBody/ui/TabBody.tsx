import { useEffect, useState } from 'react'

import { InvestProvider } from 'context/InvestCounter'
import { ActionProvider } from 'context/ActionProvider'

import { RequestVerification } from 'components/shared/RequestVerification'

import { Promotions, PromotionTable } from 'components/personal/Promotions'
import { PackageList } from 'components/personal/PackageList'
import { IncomeTable, Individual } from 'components/personal/Individual'
import { AdminBack } from 'components/admins/AdminBack'

import useDisable from 'hooks/useDisable'
import useQuery from 'hooks/useQuery'
import useProfile from 'hooks/context/useProfile'

import { tabEnum } from '../model/TabBody.interface'

import { TabBodyButtons } from './TabBodyButtons'

import s from './TabBody.module.scss'

export const TabBody = (props: { adminEdit: boolean }) => {
  const { adminEdit } = props

  const query = useQuery()
  const { payload } = useProfile()
  const disable = useDisable()

  const [tab, setTab] = useState<tabEnum>(tabEnum.ACTIVE)

  useEffect(() => {
    if (query.get('tab') === 'briefcase') {
      setTab(tabEnum.PACKAGE)
      return
    }

    if (query.get('tab') === 'action') {
      setTab(tabEnum.ACTIVE)
    }
  }, [query])

  const onClickHandler = (type: tabEnum) => {
    setTab(type)
  }

  if (disable) {
    return (
      <div className={s.grid}>
        <RequestVerification />
      </div>
    )
  }

  return (
    <InvestProvider>
      <ActionProvider>
        <AdminBack
          name={`${payload.profile?.fam} ${payload.profile?.im}`}
          adminEdit={adminEdit}
          url="/admin/users"
        />
        <div className={s.wrapper}>
          <TabBodyButtons tab={tab} onClick={onClickHandler} />
          <div className={s.body}>
            {tab === tabEnum.ACTIVE && <Promotions />}
            {tab === tabEnum.PACKAGE && <PackageList />}
            {tab === tabEnum.INDIVIDUAL && <Individual />}
          </div>
          {tab === tabEnum.ACTIVE && <PromotionTable />}
          {tab === tabEnum.INDIVIDUAL && <IncomeTable />}
        </div>
      </ActionProvider>
    </InvestProvider>
  )
}
