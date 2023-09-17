import { FC, useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { useTranslation } from 'react-i18next'

import { BgBanner } from 'assets/images'
import { ArrowLinkWhite, LogoBanner } from 'assets/icons'

import { Container } from 'components/shared/Container'

import s from './MainBanner.module.scss'

const text = [
  'Identity',
  'Creators',
  'Sustainability',
  'Everyone',
  'Builders',
  'Development',
  'Assets',
  'Shares',
  'Diversification',
]

export const MainBanner: FC = () => {
  const { t } = useTranslation('homeContent')

  const el = useRef(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: text,
      startDelay: 100,
      typeSpeed: 100,
      backSpeed: 0,
      backDelay: 600,
      loop: true,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <section className={s.banner}>
      <Container>
        <div className={s.content}>
          <h1 className={s.title}>
            Alphahedge Holdings
            <br />
            <span className={s.typed} ref={el} />
          </h1>
          <p className={s.text}>{t('bannerText')}</p>
          <a className={s.link} href="/">
            {t('bannerBtn')}
            <img className={s.arrow} src={ArrowLinkWhite} alt="logo" />
          </a>
        </div>
      </Container>
      <img className={s.logo} src={LogoBanner} alt="logo" />
      <img className={s.bg} src={BgBanner} alt="backgoround" />
    </section>
  )
}
