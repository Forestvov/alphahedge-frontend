import { Container } from 'components/shared/Container'
import { RhombusIcon } from 'assets/icons'
import { ETfBannerImg } from 'assets/images'

import s from './EtfBanner.module.scss'

export const EtfBanner = () => (
  <div className={s.banner}>
    <Container>
      <div className={s.content}>
        <h1 className={s.title}>
          <span>Биржевые фонды (ETF)</span>
          <br />
          Простой способ начать инвестировать
        </h1>
        <p className={s.text}>
          ETF – это фонды вложений, доли (удостоверения вложений) которых
          торгуются на фондовых биржах. Основные преимущества ETF:
        </p>
        <ul className={s.list}>
          <li className={s.item}>
            <img src={RhombusIcon} alt="rhombus" />
            Совершать сделки с ETF так же просто, как и с акциями
          </li>
          <li className={s.item}>
            <img src={RhombusIcon} alt="rhombus" />
            Возможность быстро и просто самостоятельно сформировать
            диверсифицированный портфель ценных бумаг
          </li>
          <li className={s.item}>
            <img src={RhombusIcon} alt="rhombus" />
            Более низкие комиссии, чем при покупке каждой акции в отдельности
          </li>
        </ul>
      </div>
    </Container>
    <img className={s.image} src={ETfBannerImg} alt="banner" />
  </div>
)
