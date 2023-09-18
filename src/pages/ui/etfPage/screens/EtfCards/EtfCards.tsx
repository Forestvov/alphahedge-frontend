import { Container } from 'components/shared/Container'
import { PrivateBagBg1, PrivateBagBg2 } from 'assets/images'
import { EtfCard } from 'pages/ui/etfPage/screens/EtfCards/EtfCard'
import s from './EtfCards.module.scss'

const EtfCardsData = [
  {
    title: 'Диверсификация',
    text: [
      'Одним вложением вы приобретаете готовую корзину активов: от акций и облигаций до товаров и валюты.',
      'В состав ETF входят разные инструменты и активы, позволяя удобно диверсифицировать инвестиционные риски.',
    ],
  },
  {
    title: 'Экономия времени',
    text: [
      'Инвестиции в ETF не требуют специальных знаний или профессиональной квалификации и доступны большинству частных инвесторов.',
      'Фонды ETF позволяют инвестировать в отрасли или индексы, которые вызывают интерес и доверие, не тратя время на изучение рынка и подбор активов.',
    ],
  },
  {
    title: 'Ликвидность',
    text: [
      'Также как и сделки с акциями, сделки с ETF можно совершать в любое время работы биржи.',
      'Фонды ETF удобны тем, что их доли можно быстро продать и купить в желаемом объёме по приемлемой для инвестора цене.',
    ],
  },
  {
    title: 'Потенциальные риски',
    text: [
      'Фонды ETF, как и любой другой инвестиционный инструмент, подвержены различного рода рискам, например, законодательному риску, риску валютных колебаний, налоговому риску, риску процентных ставок и др.',
      'Очень важно понимать эти риски и самостоятельно их оценивать*.',
    ],
  },
]

export const EtfCards = () => (
  <>
    <div className={s.etf}>
      <Container>
        <div className={s.content}>
          <h2 className={s.title}>Что такое ETF (торгуемые на бирже фонды)?</h2>
          <p className={s.desc}>
            ETF – это фонды вложений, которые торгуются на бирже и могут
            включать разные классы активов, например, акции, облигации, валютные
            инструменты, сырьевые активы и др.
          </p>
          <div className={s.cards}>
            {EtfCardsData.map((card) => (
              <EtfCard card={card} key={card.title} />
            ))}
          </div>
        </div>
      </Container>
    </div>
    <div className={s.bottom}>
      <img className={s.image1} src={PrivateBagBg1} alt="bg" />
      <img className={s.image2} src={PrivateBagBg2} alt="bg" />
    </div>
  </>
)