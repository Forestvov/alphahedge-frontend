import { useTranslation } from 'react-i18next'
import { Container } from 'components/shared/Container'
import { RhombusIcon } from 'assets/icons'

import { PrivateBagBannerImg } from 'assets/images'
import s from './PrivateBagBanner.module.scss'

export const PrivateBagBanner = () => {
  const [t] = useTranslation('privateBagPage')

  return (
    <div className={s.banner}>
      <Container>
        <div className={s.content}>
          <h1 className={s.title}>
            <span>{t('banner.titlePink')}</span>
            <br />
            {t('banner.title')}
          </h1>
          <p className={s.text}>{t('banner.text')}</p>
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
            <li className={s.item}>
              <img src={RhombusIcon} alt="rhombus" />
              {t('banner.item4')}
            </li>
            <li className={s.item}>
              <img src={RhombusIcon} alt="rhombus" />
              {t('banner.item5')}
            </li>
          </ul>
        </div>
      </Container>
      <img className={s.image} src={PrivateBagBannerImg} alt="banner" />
    </div>
  )
}
