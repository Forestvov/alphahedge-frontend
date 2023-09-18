import { Container } from 'components/shared/Container'
import { RhombusIcon } from 'assets/icons'
import { PrivateBagBannerImg } from 'assets/images'

import s from './PrivateBagBanner.module.scss'

export const PrivateBagBanner = () => (
  <div className={s.banner}>
    <Container>
      <div className={s.content}>
        <h1 className={s.title}>
          <span>Частный портфель</span>
          <br />
          Удобный и эффективный способ вложения денежных средств
        </h1>
        <p className={s.text}>
          Решение накопительного страхования жизни для накоплений и совершения
          инвестиций. Удобное решение, если хотите доверить управление
          инвестициями опытным экспертам.
        </p>
        <ul className={s.list}>
          <li className={s.item}>
            <img src={RhombusIcon} alt="rhombus" />
            Инвестиции в соответствии с выбранной стратегией
          </li>
          <li className={s.item}>
            <img src={RhombusIcon} alt="rhombus" />
            Возможность указать выгодоприобретателя
          </li>
          <li className={s.item}>
            <img src={RhombusIcon} alt="rhombus" />
            Налог с полученной прибыли рассчитывается и удерживается
            автоматически
          </li>
          <li className={s.item}>
            <img src={RhombusIcon} alt="rhombus" />
            Возможность каждый год получать возврат подоходного налога с
            населения в размере 20%
          </li>
          <li className={s.item}>
            <img src={RhombusIcon} alt="rhombus" />
            Более выгодная комиссия за администрирование, от 0,29% до 0,99% в
            год
          </li>
        </ul>
      </div>
    </Container>
    <img className={s.image} src={PrivateBagBannerImg} alt="banner" />
  </div>
)
