import { RhombusIcon } from 'assets/icons'
import s from './EtfCards.module.scss'

interface EtfCardProps {
  card: {
    title: string
    text: string[]
  }
}

export const EtfCard = ({ card }: EtfCardProps) => {
  const { title, text } = card

  return (
    <div className={s.card}>
      <div className={s.card_title}>{title}</div>
      <ul>
        {text.map((item) => (
          <li className={s.item} key={item}>
            <img src={RhombusIcon} alt="rhombus" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
