import { useTranslation } from 'react-i18next'
import { Container } from 'components/shared/Container'
import { AboutInvestImg } from 'assets/images'
import { LightningIcon } from 'assets/icons'
import s from './Invest.module.scss'

export const Invest = () => {
  const [t] = useTranslation('aboutUsPage')

  return (
    <section className={s.invest}>
      <Container>
        <h2 className={s.title}>
          <span>{t('invest.titlePink')}</span> {t('invest.title')}
        </h2>
        <div className={s.content}>
          <div className={s.desc}>
            <p className={s.text}>{t('invest.text')}</p>
            <div className={s.bottom}>
              <div className={s.item}>
                <img src={LightningIcon} alt="lightning" />
                {t('invest.item1')}
              </div>
              <div className={s.item}>
                <img src={LightningIcon} alt="lightning" />
                {t('invest.item2')}
              </div>
              <div className={s.item}>
                <img src={LightningIcon} alt="lightning" />
                {t('invest.item3')}
              </div>
              <div className={s.item}>
                <img src={LightningIcon} alt="lightning" />
                {t('invest.item4')}
              </div>
            </div>
          </div>
          <img className={s.image} src={AboutInvestImg} alt="invest" />
        </div>
      </Container>
    </section>
  )
}
