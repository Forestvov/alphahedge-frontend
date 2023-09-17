import { useCallback, useEffect, useState } from 'react'
import cn from 'classnames'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react'

import BriefcaseServices from 'services/BriefcaseServices'
import { IBriefcaseActive } from 'models/response/BriefcaseResponse'

import { InfoCard } from 'components/shared/InfoCard'
import { Loader } from 'components/shared/Loader'
import { CarouselPagination } from 'components/shared/CarouselPagination'

import { IActivePortfolios } from '../model/ActivePortfolios.interface'
import s from './ActivePortfolios.module.scss'
import { useTranslation } from 'react-i18next'

const options: EmblaOptionsType = {
  align: 'start',
}

const { getMyBriefcaseActive } = BriefcaseServices

export const ActivePortfolios = (props: IActivePortfolios) => {
  const { isAdmin = false } = props

  const [p] = useTranslation('panel')

  const [briefcases, setBriefcase] = useState<IBriefcaseActive[] | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(1)

  const [otherRef, embla] = useEmblaCarousel({ ...options })

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap() + 1)
  }, [])

  const getBriefcase = async () => {
    try {
      const response = await getMyBriefcaseActive({
        size: 10,
        page: 0,
        criteria: [{ key: 'briefcaseCode', value: 'SIMPLE' }],
      })
      await setBriefcase(response.data)
    } catch (e) {
      console.log('Error fetch active brief', e)
    }
  }

  useEffect(() => {
    getBriefcase()

    if (!embla) return
    onSelect(embla)
    embla.on('reInit', onSelect)
    embla.on('select', onSelect)
  }, [embla])

  if (!briefcases) {
    return (
      <div className={cn(s.wrapper, s.pending)}>
        <Loader className={s.loader} />
      </div>
    )
  }

  return (
    <div className={s.wrapper}>
      <div className={s.carousel} ref={otherRef}>
        {briefcases.length > 0 ? (
          <div className={s.list}>
            {briefcases.map((brief) => (
              <InfoCard {...brief} fetch={getBriefcase} isAdmin={isAdmin} />
            ))}
          </div>
        ) : (
          <div className={s.empty}>{p('notHavePackage')}</div>
        )}
      </div>

      <CarouselPagination
        total={briefcases.length}
        index={selectedIndex}
        className={s.pagination}
        nextButtonClick={scrollNext}
        prevButtonClick={scrollPrev}
      />
    </div>
  )
}
