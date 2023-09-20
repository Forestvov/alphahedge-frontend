import { Container } from 'components/shared/Container'
import { LightningIcon } from 'assets/icons'
import { InvestingProBannerImg } from 'assets/images'

import s from './InvestingProBanner.module.scss'

export const InvestingProBanner = () => (
  <div className={s.banner}>
    <Container>
      <div className={s.content}>
        <h1 className={s.title}>
          Фондовый рынок – это <span>движение</span> ,<br /> это{' '}
          <span>эволюция</span>, это
          <span>искусство</span> прогнозирования.
        </h1>
        <ul className={s.list}>
          <li className={s.item}>
            <img src={LightningIcon} alt="rhombus" />
            Мы придерживаемся подхода, который объединяет надежность и
            инновации, стремясь обеспечить стабильный рост в долгосрочной
            перспективе.
          </li>
          <li className={s.item}>
            <img src={LightningIcon} alt="rhombus" />
            Наши эксперты постоянно отслеживают тенденции рынка и проводят
            фундаментальный анализ, чтобы определить потенциально
            привлекательные возможности.
          </li>
          <li className={s.item}>
            <img src={LightningIcon} alt="rhombus" />
            Наша миссия заключается в создании и управлении портфелем активов,
            который соответствует нашим целям и философии, а также способствует
            достижению ваших инвестиционных амбиций.
          </li>
        </ul>
      </div>
    </Container>
    <img className={s.image} src={InvestingProBannerImg} alt="banner" />
  </div>
)
