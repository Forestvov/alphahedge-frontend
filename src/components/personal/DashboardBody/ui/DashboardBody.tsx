import { useTranslation } from 'react-i18next'

import useDisable from 'hooks/useDisable'

import { AdminBack } from 'components/admins/AdminBack'

import { Balance } from 'components/personal/Balance'
import { ActivePortfolios } from 'components/personal/ActivePortfolios'
import { Referral } from 'components/personal/Referral'
import { ActivePackage } from 'components/personal/ActivePackage'

import { PersonalBlock } from 'components/shared/PersonalBlock'
import { RequestVerification } from 'components/shared/RequestVerification'

import useProfile from 'hooks/context/useProfile'

import s from './DashboardBody.module.scss'

export const DashboardBody = (props: { adminEdit: boolean }) => {
  const { adminEdit } = props

  const [c] = useTranslation('common')

  const { payload } = useProfile()

  const { profile } = payload

  const disable = useDisable()

  const isEdit = localStorage.getItem('editor')

  if (disable) {
    return <RequestVerification />
  }

  return (
    <>
      <AdminBack
        name={`${profile?.fam} ${profile?.im}`}
        adminEdit={adminEdit}
        url="/admin/users"
      />
      <div className={s.grid}>
        <div className={s.col}>
          <PersonalBlock label={c('totalBalance')}>
            <Balance />
          </PersonalBlock>
          <PersonalBlock
            label={c('activeBrief')}
            link={
              isEdit === '1'
                ? `/admin/user/${profile?.accountId}/investments?tab=briefcase`
                : '/personal/investments?tab=briefcase'
            }
            textLink={c('allBrief')}
          >
            <ActivePortfolios isAdmin={payload?.profile?.role === 'Admin'} />
          </PersonalBlock>
        </div>
        <PersonalBlock label={c('refSystem')}>
          <Referral />
        </PersonalBlock>
      </div>
      <PersonalBlock label={c('packageActions')}>
        <ActivePackage
          link={
            isEdit === '1'
              ? `/admin/user/${profile?.accountId}/investments?tab=action`
              : '/personal/investments?tab=action'
          }
        />
      </PersonalBlock>
    </>
  )
}
