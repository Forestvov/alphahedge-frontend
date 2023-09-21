import { useTranslation } from 'react-i18next'
import { FC } from 'react'
import { Container } from 'components/shared/Container'
import { BannerImg, BgBanner1, BgBanner2 } from 'assets/images'
import { ArrowIcon } from 'assets/icons'
import s from './ForexBanner.module.scss'

export const ForexBanner: FC = () => {
  const [t] = useTranslation('forexPage')

  return (
    <section className={s.banner}>
      <Container>
        <div className={s.content}>
          <div className={s.desc}>
            <h1 className={s.title}>
              <span>{t('banner.title')}</span>
              <br />
              {t('banner.titlePink')}
            </h1>
            <p className={s.text__title}>
              {t('banner.textTitle1')}
              <br />
              {t('banner.textTitle2')}
            </p>
            <p className={s.text}>{t('banner.text1')}</p>
            <p className={s.text}>{t('banner.text2')}</p>
          </div>
          <img className={s.img} src={BannerImg} alt="img" />
        </div>
        <a href="/forex#courses" className={s.button}>
          {t('banner.button')}
          <img src={ArrowIcon} alt="arrow" />
        </a>
      </Container>
      <img className={s.bg1} src={BgBanner1} alt="bg" />
      <img className={s.bg2} src={BgBanner2} alt="bg" />
    </section>
  )
}
