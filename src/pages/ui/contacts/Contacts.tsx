import { Container } from 'components/shared/Container'
import { Mapimg } from 'assets/images'
import { ContactsCard } from './ContactsCard'
import s from './Contacts.module.scss'

const ContactsCards = [
  {
    title: 'Адресс',
    text: 'Главный офис расположен в ',
    link: 'Travessera de Gràcia, 21, 08021 Барселона, Испания',
    type: 'text',
  },
  {
    title: 'Почта',
    text: 'Вопросы или проблемы? Свяжитесь с нами!',
    link: 'ah-support@gmail.com',
    type: 'mail',
  },
  {
    title: 'Telegram новости',
    text: 'Получайте новости о мире финансов!',
    link: 'https://t.me/alphahedge_holding',
    type: 'link',
  },
  {
    title: 'Telegram форекс',
    text: 'Получайте аналитку форекс!',
    link: 'https://t.me/alphahedge_forex',
    type: 'link',
  },
]

export const Contacts = () => (
  <Container>
    <div className={s.content}>
      <div className={s.left}>
        <span className={s.label}>Контакты</span>
        <h1 className={s.title}>Мы профессиональная команда</h1>
        <p className={s.text}>
          Свяжитесь с Нами для Обсуждения Инвестиционных Возможностей
        </p>
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
