import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import { useTranslation } from 'react-i18next'

import { Container } from 'components/shared/Container'
import { CarouselNavigation } from 'components/shared/CarouselNavigation'
import { TitleSection } from 'components/shared/TitleSection'

import { UniquenessBg } from 'assets/images'

import { IUniquenessCard } from './Uniqueness.interface'
import { UniquenessCard } from './UniquenessCard'
import s from './Uniqueness.module.scss'

const options: EmblaOptionsType = {
  align: 'start',
}

export const Uniqueness = () => {
  const [t] = useTranslation('homeContent')

  const [otherRef, embla] = useEmblaCarousel({ ...options })

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

  return (
    <section className={s.section}>
      <Container>
        <div className={s.header}>
          <TitleSection title={t('titleFirst')} />
          <CarouselNavigation
            className={s.navigation}
            prevButtonClick={scrollPrev}
            nextButtonClick={scrollNext}
          />
        </div>
        <div className={s.carousel} ref={otherRef}>
          <div className={s.list}>
            {t('cards', { returnObjects: true, defaultValue: ['', ''] }).map(
              (card: IUniquenessCard, idx: number) => (
                <UniquenessCard key={idx} title={card.title} text={card.text} />
              ),
            )}
          </div>
        </div>
      </Container>
      <img className={s.bg} src={UniquenessBg} alt="bg" />
    </section>
  )
}
