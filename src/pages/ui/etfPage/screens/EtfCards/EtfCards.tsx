import { useTranslation } from 'react-i18next'
import { Container } from 'components/shared/Container'
import { PrivateBagBg1, PrivateBagBg2 } from 'assets/images'
import { EtfCard } from 'pages/ui/etfPage/screens/EtfCards/EtfCard'
import s from './EtfCards.module.scss'

export const EtfCards = () => {
  const [t] = useTranslation('etfPage')

  const EtfCardsData = [
    {
      title: t('cards.card1.title'),
      text: [
        t('cards.card1.desc1'),
        t('cards.card1.desc2'),
      ],
    },
    {
      title: t('cards.card2.title'),
      text: [
        t('cards.card2.desc1'),
        t('cards.card2.desc2'),
      ],
    },
    {
      title: t('cards.card3.title'),
      text: [
        t('cards.card3.desc1'),
        t('cards.card3.desc2'),
      ],
    },
    {
      title: t('cards.card4.title'),
      text: [
        t('cards.card4.desc1'),
        t('cards.card4.desc2'),
      ],
    },
  ]

  return (
    <>
      <div className={s.etf}>
        <Container>
          <div className={s.content}>
            <h2 className={s.title}>{t('cards.title')}</h2>
            <p className={s.desc}>{t('cards.text')}</p>
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
}
