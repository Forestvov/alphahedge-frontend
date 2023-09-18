import s from './Contacts.module.scss'

interface ContactsCardProps {
  title: string
  text: string
  link: string
  type: string
}

export const ContactsCard = (props: ContactsCardProps) => {
  const { title, link, text, type } = props
  return (
    <div className={s.card}>
      <h1 className={s.card_title}>{title}</h1>
      <p className={s.card_text}>{text}</p>

      {type === 'mail' && (
        <a className={s.card_link} type="email" href={`mailto:${link}`}>
          {link}
        </a>
      )}
      {type === 'link' && (
        <a className={s.card_link} target="_blank" href={link} rel="noreferrer">
          {link}
        </a>
      )}
      {type === 'text' && <span className={s.card_link}>{link}</span>}
    </div>
  )
}
