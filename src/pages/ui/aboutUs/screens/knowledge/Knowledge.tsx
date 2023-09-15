import { Container } from 'components/shared/Container'
import { CheckIcon } from 'assets/icons'
import s from './Knowledge.module.scss'

export const Knowledge = () => (
  <section className={s.knowledge}>
    <Container>
      <div className={s.content}>
        <div className={s.desc1}>
          <h2 className={s.title}>
            Инвестиции в Знания и Социальную Ответственность
          </h2>
          <span className={s.label}>
            Образование и исследования в мире инвестиций.
          </span>
          <div className={s.bottom}>
            <div className={s.number}>25 +</div>
            <div className={s.number_label}>Благотворительных проектов</div>
          </div>
        </div>
        <div className={s.desc2}>
          <div className={s.item}>
            <div className={s.item_title}>
              <img className={s.check} src={CheckIcon} alt="check" />
              Сотрудники
            </div>
            <p className={s.item_text}>
              Фонд также активно инвестировал в образование своих сотрудников.
              Организация регулярно проводила внутренние семинары, тренинги и
              финансовые образовательные программы.{' '}
            </p>
          </div>
          <div className={s.item}>
            <div className={s.item_title}>
              <img className={s.check} src={CheckIcon} alt="check" />
              Исследования
            </div>
            <p className={s.item_text}>
              Команда фонда следила за последними тенденциями на финансовых
              рынках и активно исследовала новые возможности для инвестирования.
            </p>
          </div>
          <div className={s.item}>
            <div className={s.item_title}>
              <img className={s.check} src={CheckIcon} alt="check" />
              Благотворительность
            </div>
            <p className={s.item_text}>
              Фонд также придавал важное значение социальной ответственности. Он
              участвовал в благотворительных проектах, направленных на поддержку
              образования, медицины и экологии.
            </p>
          </div>
        </div>
      </div>
    </Container>
  </section>
)
