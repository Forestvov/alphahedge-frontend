import { InvestingProTrustCard } from 'pages/ui/investingPro/screens/InvestingProTrust/InvestingProTrustCard'
import {
  InvestingProTrustImg1,
  InvestingProTrustImg2,
  InvestingProTrustImg3,
  InvestingProTrustImg4,
  InvestingProTrustImg5,
  InvestingProTrustImg6,
} from 'assets/images'

import s from './InvestingProTrust.module.scss'

const TrustCardData = [
  {
    image: InvestingProTrustImg1,
    title: 'Соблюдаем MiFID II',
    text: 'Неукоснительно следуем европейскому регуляторному режиму с наивысшим уровнем защиты инвесторов в мире.',
  },
  {
    image: InvestingProTrustImg2,
    title: 'Европейское регулирование',
    text: 'Лицензия CySEC и паспортизация во всех странах Евросоюза.Также подотчетны SEC и BaFin.',
  },
  {
    image: InvestingProTrustImg3,
    title: 'Член AFME',
    text: 'В составе Европейского ассоциации по финансовым рынкам мы участвуем в разработке инициатив в области регуляции европейских рынков капитала.',
  },
  {
    image: InvestingProTrustImg4,
    title: 'Надежность доказана аудитами',
    text: 'Мы проходим регулярные аудиты и процедуры due diligence, которые проводят KPMG, авторизованный SEC консорциум BDOб также S&P и Euroclear.',
  },
  {
    image: InvestingProTrustImg5,
    title: 'Гарантии Investor Compensation Fund',
    text: 'Ваши денежные средства находятся под защитой европейского законодательства и застрахованны на сумму до 20 000 евро.',
  },
  {
    image: InvestingProTrustImg6,
    title: 'Рейтинг S&P на уровне “B/B”',
    text: 'Международное рейтинговое агенство Standard & Poor’s Global Ratings присвоило нам долгосрочный кредитный рейтинг на уровне “B/B” .',
  },
]
export const InvestingProTrust = () => (
  <div className={s.trustContainer}>
    <div className={s.trust_title}>
      <h1 className={s.main_title}>Почему нам доверяют</h1>
      <h2 className={s.title_text}>Наши успехи и репутация</h2>
    </div>
    <div className={s.cards}>
      {TrustCardData.map((card) => (
        <InvestingProTrustCard card={card} key={card.title} />
      ))}
    </div>
  </div>
)
