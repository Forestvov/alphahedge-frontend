import {useTranslation} from "react-i18next";
import { AboutIpoImg } from 'assets/images'
import s from './Ipo.module.scss'

export const Ipo = () => {
  const [t] = useTranslation('aboutUsPage')

  return (
    <section className={s.ipo}>
      <div className={s.content}>
        <img className={s.image} src={AboutIpoImg} alt="ipo" />
        <div className={s.desc}>
          <span className={s.label}>{t('ipo.label')}</span>
          <h2 className={s.title}>{t('ipo.title')}</h2>
          <p className={s.text}>
            {t('ipo.text')}
          </p>
        </div>
      </div>
    </section>
  )
}
