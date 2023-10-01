import { ApiKeys, SystemTokens } from 'components/admins/SystemSetting'

import s from './SystemPage.module.scss'

export const SystemPage = () => (
  <div className={s.wrapper}>
    <ApiKeys />
    <SystemTokens />
  </div>
)
