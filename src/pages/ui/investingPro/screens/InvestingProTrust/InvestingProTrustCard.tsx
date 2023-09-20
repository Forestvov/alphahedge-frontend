import s from './InvestingProTrust.module.scss'

interface TrustCardProps {
  card: {
    title: string
    text: string
    image?: string
  }
}

export const InvestingProTrustCard = ({ card }: TrustCardProps) => {
  const { title, text, image } = card

  return (
    <div className={s.card}>
      <img className={s.TrustCardImage} src={image} alt="CardImg" />
      <div className={s.card_title}>{title}</div>
      <div className={s.card_text}>{text}</div>
    </div>
  )
}
