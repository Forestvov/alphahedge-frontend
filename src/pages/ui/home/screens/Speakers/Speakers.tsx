import { useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { useTranslation } from 'react-i18next'

import { Container } from 'components/shared/Container'
import { TitleSection } from 'components/shared/TitleSection'
import { CarouselNavigation } from 'components/shared/CarouselNavigation'

import { Speaker } from './Speaker'

import { ISpeaker } from './Speaker.interface'

import s from './Speakers.module.scss'

const options: EmblaOptionsType = {
  align: 'start',
}

export const Speakers = () => {
  const [t] = useTranslation('homeContent')

  const [otherRef, embla] = useEmblaCarousel({ ...options })

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

  return (
    <section className={s.section}>
      <Container>
        <div className={s.header}>
          <TitleSection title={t('speakTitle')} />
          <CarouselNavigation
            className={s.navigation}
            prevButtonClick={scrollPrev}
            nextButtonClick={scrollNext}
          />
        </div>
        <div className={s.carousel} ref={otherRef}>
          <div className={s.list}>
            {t('speakers', { returnObjects: true, defaultValue: ['', ''] }).map(
              (speaker: ISpeaker, key: number) => (
                <Speaker {...speaker} key={key} />
              ),
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
