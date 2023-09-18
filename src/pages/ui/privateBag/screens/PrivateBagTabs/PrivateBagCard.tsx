import { RhombusIcon } from 'assets/icons'
import s from './PrivateBagTabs.module.scss'

interface PrivateBagCardProps {
  card: {
    title: string
    desc: string[]
  }
}

export const PrivateBagCard = ({card}: PrivateBagCardProps) => {
  const {title, desc} = card

  return (
    <div className={s.card}>
      <h4 className={s.title}>{title}</h4>
      <ul className={s.list}>
        {
          desc.map((item) => (
            <li className={s.item} key={item}>
              <img src={RhombusIcon} alt="rhombus" />
              {item}
            </li>
          ))
        }
      </ul>
    </div>
  )
}