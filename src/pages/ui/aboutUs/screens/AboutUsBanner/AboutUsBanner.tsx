import { useTranslation } from 'react-i18next'
import { Container } from 'components/shared/Container'
import { AboutBannerImg, AboutBannerBg, AboutBorder } from 'assets/images'
import { ArrowLinkWhite } from 'assets/icons'
import s from './AboutUsBanner.module.scss'

export const AboutUsBanner = () => {
  const [t] = useTranslation('aboutUsPage')

  return (
    <section className={s.banner}>
      <Container>
        <div className={s.content}>
          <h1 className={s.title}>{t('banner.title')}</h1>
          <p className={s.text}>{t('banner.text')}</p>
          <button className={s.button} type="button">
            {t('banner.button')}
            <img className={s.arrow} src={ArrowLinkWhite} alt="logo" />
          </button>
        </div>
      </Container>
      <img className={s.img} src={AboutBannerImg} alt="about" />
      <img className={s.border} src={AboutBorder} alt="about" />
      <img className={s.bg} src={AboutBannerBg} alt="about" />
    </section>
  )
}
