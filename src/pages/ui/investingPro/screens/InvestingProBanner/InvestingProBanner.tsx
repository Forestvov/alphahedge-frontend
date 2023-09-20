import { useTranslation } from 'react-i18next'
import { Container } from 'components/shared/Container'
import { LightningIcon } from 'assets/icons'

import { InvestingProBannerImg } from 'assets/images'
import s from './InvestingProBanner.module.scss'

export const InvestingProBanner = () => {
  const [t] = useTranslation('investingProPage')

  return (
    <div className={s.banner}>
      <Container>
        <div className={s.content}>
          <h1 className={s.title}>
            {t('banner.title')} <span>{t('banner.titlePink')}</span> ,<br />{' '}
            {t('banner.title1')} <span>{t('banner.titlePink1')}</span>,{' '}
            {t('banner.title2')}
            <span> {t('banner.titlePink2')}</span> {t('banner.title3')}
          </h1>
          <ul className={s.list}>
            <li className={s.item}>
              <img src={LightningIcon} alt="rhombus" />
              {t('banner.text1')}
            </li>
            <li className={s.item}>
              <img src={LightningIcon} alt="rhombus" />
              {t('banner.text2')}
            </li>
            <li className={s.item}>
              <img src={LightningIcon} alt="rhombus" />
              {t('banner.text3')}
            </li>
          </ul>
        </div>
      </Container>
      <img className={s.image} src={InvestingProBannerImg} alt="banner" />
    </div>
  )
}
