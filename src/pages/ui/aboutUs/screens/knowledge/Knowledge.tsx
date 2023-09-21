import {useTranslation} from "react-i18next";
import { Container } from 'components/shared/Container'
import { CheckIcon } from 'assets/icons'
import s from './Knowledge.module.scss'

export const Knowledge = () => {
  const [t] = useTranslation('aboutUsPage')

  return (
    <section className={s.knowledge}>
      <Container>
        <div className={s.content}>
          <div className={s.desc1}>
            <h2 className={s.title}>
              {t('knowledge.title')}
            </h2>
            <p className={s.text}>
              {t('knowledge.text')}
            </p>
            <div className={s.bottom}>
              <div className={s.number}>25 +</div>
              <div className={s.number_label}>{t('knowledge.numberLabel')}</div>
            </div>
          </div>
          <div className={s.desc2}>
            <div className={s.item}>
              <div className={s.item_title}>
                <img className={s.check} src={CheckIcon} alt="check" />
                {t('knowledge.card1.title')}
              </div>
              <p className={s.item_text}>
                {t('knowledge.card1.text')}
              </p>
            </div>
            <div className={s.item}>
              <div className={s.item_title}>
                <img className={s.check} src={CheckIcon} alt="check" />
                {t('knowledge.card2.title')}
              </div>
              <p className={s.item_text}>
                {t('knowledge.card2.text')}
              </p>
            </div>
            <div className={s.item}>
              <div className={s.item_title}>
                <img className={s.check} src={CheckIcon} alt="check" />
                {t('knowledge.card3.title')}
              </div>
              <p className={s.item_text}>
                {t('knowledge.card3.text')}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
