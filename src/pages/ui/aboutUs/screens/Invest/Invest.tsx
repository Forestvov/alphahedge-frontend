import { Container } from 'components/shared/Container'
import { AboutInvestImg } from 'assets/images'
import { LightningIcon } from 'assets/icons'
import s from './Invest.module.scss'

export const Invest = () => (
  <section className={s.invest}>
    <Container>
      <h2 className={s.title}>
        <span>Долгосрочное инвестирование</span> и инновации в фокусе
      </h2>
      <div className={s.content}>
        <div className={s.desc}>
          <p className={s.text}>
            Фонд Alphahedge Holdings пропагандировал принцип долгосрочного
            инвестирования, основанного на фундаментальном анализе компаний и
            рынков. Одной из ключевых особенностей фонда был акцент на выборе
            компаний, которые демонстрировали инновационный подход к бизнесу и
            были ориентированы на будущее.
          </p>
          <div className={s.bottom}>
            <div className={s.item}>
              <img src={LightningIcon} alt="lightning" />
              Долгосрочное инвестирование
            </div>
            <div className={s.item}>
              <img src={LightningIcon} alt="lightning" />
              Фундаментальный анализ
            </div>
            <div className={s.item}>
              <img src={LightningIcon} alt="lightning" />
              Инновационный подход
            </div>
            <div className={s.item}>
              <img src={LightningIcon} alt="lightning" />
              Ориентация на будущее
            </div>
          </div>
        </div>
        <img className={s.image} src={AboutInvestImg} alt="invest" />
      </div>
    </Container>
  </section>
)
