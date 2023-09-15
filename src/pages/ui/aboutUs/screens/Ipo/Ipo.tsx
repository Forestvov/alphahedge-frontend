import { AboutIpoImg } from 'assets/images'
import s from './Ipo.module.scss'

export const Ipo = () => (
  <section className={s.ipo}>
    <div className={s.content}>
      <img className={s.image} src={AboutIpoImg} alt="ipo" />
      <div className={s.desc}>
        <span className={s.label}>Инновационный подход</span>
        <h2 className={s.title}>Успешные Инвестиции и Ведущие IPO</h2>
        <p className={s.text}>
          За годы своей деятельности Alphahedge Holdings добился значительных
          успехов. Фонд успешно управлял портфелем инвестиций, достигая
          стабильной доходности для своих клиентов. Благодаря стратегии выбора
          компаний, ориентированных на инновации, фонд часто участвовал в
          успешных IPO.
        </p>
      </div>
    </div>
  </section>
)
