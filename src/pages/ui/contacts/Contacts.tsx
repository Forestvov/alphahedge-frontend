import { useTranslation } from 'react-i18next'

import { Container } from 'components/shared/Container'
import { Mapimg } from 'assets/images'
import { ContactsCard } from './ContactsCard'
import s from './Contacts.module.scss'

export const Contacts = () => {
  const [t] = useTranslation('contactsPage')

  const ContactsCards = [
    {
      title: t('card1.title'),
      text: t('card1.text'),
      link: `Travessera de Gràcia, 21, 08021 ${t('card1.link')}`,
      type: 'text',
    },
    {
      title: t('card2.title'),
      text: t('card2.text'),
      link: 'alphahedgeholdings@gmail.com',
      type: 'mail',
    },
    {
      title: t('card3.title'),
      text: t('card3.text'),
      link: 'https://t.me/alphahedge_holding',
      type: 'link',
    },
    {
      title: t('card4.title'),
      text: t('card4.text'),
      link: 'https://t.me/alphahedge_forex',
      type: 'link',
    },
  ]

  return (
    <Container>
      <div className={s.content}>
        <div className={s.left}>
          <span className={s.label}>{t('label')}</span>
          <h1 className={s.title}>{t('title')}</h1>
          <p className={s.text}>{t('text')}</p>
          <img className={s.image} src={Mapimg} alt="Map" />
        </div>
        <div className={s.right}>
          {ContactsCards.map((card) => (
            <ContactsCard
              title={card.title}
              text={card.text}
              link={card.link}
              type={card.type}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}
