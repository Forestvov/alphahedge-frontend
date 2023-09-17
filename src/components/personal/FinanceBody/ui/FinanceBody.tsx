import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { AdminBack } from 'components/admins/AdminBack'

import { RequestVerification } from 'components/shared/RequestVerification'

import { Balance } from 'components/personal/Balance'
import { TransactionBlock } from 'components/personal/TransactionBlock'
import { IncomeTableFinance } from 'components/personal/IncomeTableFinance'

import useTokens from 'hooks/useTokens'
import useDisable from 'hooks/useDisable'
import useProfile from 'hooks/context/useProfile'

import { PersonalBlock } from 'components/shared/PersonalBlock'

import TransactionServices from 'services/TransactionServices'

import s from './FinanceBody.module.scss'

const { getTokens } = TransactionServices

export const FinanceBody = (props: { adminEdit: boolean }) => {
  const { adminEdit } = props

  const [c] = useTranslation('common')

  const { setTokens } = useTokens()

  const { payload } = useProfile()

  const disable = useDisable()

  useEffect(() => {
    fetchTokens()
  }, [])

  const fetchTokens = async () => {
    try {
      const response = await getTokens()
      setTokens([...response.data])
    } catch (e) {
      console.log('Error fetch tokens', e)
    }
  }

  if (disable) {
    return <RequestVerification />
  }

  return (
    <>
      <AdminBack
        name={`${payload.profile?.fam} ${payload.profile?.im}`}
        adminEdit={adminEdit}
        url="/admin/users"
      />
      <div className={s.grid}>
        <div className={s.col}>
          <PersonalBlock label={c('totalBalance')}>
            <Balance />
          </PersonalBlock>
          <PersonalBlock className={s.block} label={c('in')}>
            <TransactionBlock className={s.form} type="In" />
          </PersonalBlock>
        </div>
        <PersonalBlock label={c('out')}>
          <TransactionBlock className={s.derivation} type="Out" />
        </PersonalBlock>
      </div>
      <IncomeTableFinance />
    </>
  )
}
