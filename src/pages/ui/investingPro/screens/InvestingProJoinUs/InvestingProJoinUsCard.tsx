import s from './InvestingProJoinUs.module.scss'

interface JoinUsCardProps {
  card: {
    title: string
    text: string
    label: string
  }
}
export const InvestingProJoinUsCard = ({ card }: JoinUsCardProps) => {
  const { title, text, label } = card

  return (
    <div className={s.card}>
      <h1 className={s.card_title}>{title}</h1>
      <h2 className={s.card_label}>{label}</h2>
      <p className={s.card_text}>{text}</p>
    </div>
  )
}
