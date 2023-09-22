import { useTranslation } from 'react-i18next'
import { Container } from 'components/shared/Container'
import { RhombusIcon } from 'assets/icons'

import { ETfBannerImg } from 'assets/images'
import s from './EtfBanner.module.scss'

export const EtfBanner = () => {
  const [t] = useTranslation('etfPage')

  return (
    <div className={s.banner}>
      <Container>
        <div className={s.content}>
          <h1 className={s.title}>
            <span>{t('banner.titlePink')}</span>
            <br />
            {t('banner.title')}
          </h1>
          <p className={s.text}>
            {t('banner.text')}
          </p>
          <ul className={s.list}>
            <li className={s.item}>
              <img src={RhombusIcon} alt="rhombus" />
              {t('banner.item1')}
            </li>
            <li className={s.item}>
              <img src={RhombusIcon} alt="rhombus" />
              {t('banner.item2')}
            </li>
            <li className={s.item}>
              <img src={RhombusIcon} alt="rhombus" />
              {t('banner.item3')}
            </li>
          </ul>
        </div>
      </Container>
      <img className={s.image} src={ETfBannerImg} alt="banner" />
    </div>
  )
}
