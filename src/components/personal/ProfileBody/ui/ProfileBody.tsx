import { AdminBack } from 'components/admins/AdminBack'

import useProfile from 'hooks/context/useProfile'

import { ProfileEditor } from './ProfileEditor/ProfileEditor'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import { ProfileTokens } from './ProfileEditor/ProfileTokens'

import s from './ProfileBody.module.scss'

export const ProfileBody = (props: { adminEdit: boolean }) => {
  const { adminEdit } = props

  const {
    payload: { profile },
  } = useProfile()

  return (
    <>
      <AdminBack
        name={`${profile?.fam} ${profile?.im}`}
        adminEdit={adminEdit}
        url="/admin/users"
      />
      <div className={s.wrapper}>
        {profile && (
          <>
            <ProfileEditor
              email={profile.email}
              userName={profile.userName}
              im={profile.im}
              fam={profile.fam}
              phoneNumber={profile.phoneNumber}
              country={profile.country}
            />
            <ProfileTokens />
            <ProfileInfo status={profile.verifiedStatus} />
          </>
        )}
      </div>
    </>
  )
}
