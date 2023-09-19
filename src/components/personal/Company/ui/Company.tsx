import { ICompany } from '../model/Company.interface'

import s from './Company.module.scss'

export const Company = (props: ICompany) => {
  const { name, icon } = props
  return (
    <div className={s.company}>
      <div className={s.icon}>
        <img src={icon} alt={name} />
      </div>
      <div className={s.name}>{name}</div>
    </div>
  )
}
