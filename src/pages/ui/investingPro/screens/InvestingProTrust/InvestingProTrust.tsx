import {useTranslation} from "react-i18next";
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


export const InvestingProTrust = () => {
  const [t] = useTranslation('investingProPage')

  const TrustCardData = [
    {
      image: InvestingProTrustImg1,
      title: t('trust.card1.title'),
      text: t('trust.card1.label'),
    },
    {
      image: InvestingProTrustImg2,
      title: t('trust.card2.title'),
      text: t('trust.card2.label'),
    },
    {
      image: InvestingProTrustImg3,
      title: t('trust.card3.title'),
      text: t('trust.card3.label'),
    },
    {
      image: InvestingProTrustImg4,
      title: t('trust.card4.title'),
      text: t('trust.card4.label'),
    },
    {
      image: InvestingProTrustImg5,
      title: t('trust.card5.title'),
      text: t('trust.card5.label'),
    },
    {
      image: InvestingProTrustImg6,
      title: t('trust.card6.title'),
      text: t('trust.card6.label'),
    },
  ]
  return (
    <div className={s.trustContainer}>
      <div className={s.trust_title}>
        <h1 className={s.main_title}>{t('trust.title')}</h1>
        <h2 className={s.title_text}>{t('trust.label')}</h2>
      </div>
      <div className={s.cards}>
        {TrustCardData.map((card) => (
          <InvestingProTrustCard card={card} key={card.title} />
        ))}
      </div>
    </div>
  )
}
