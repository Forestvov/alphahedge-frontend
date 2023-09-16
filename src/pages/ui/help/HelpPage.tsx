/* eslint-disable */
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AnimateHeight from 'react-animate-height'

import { TitleSection } from 'components/shared/TitleSection'
import { Container } from 'components/shared/Container'

import s from './HelpPage.module.scss'
import cn from 'classnames'

interface IHelp {
  title: string
  text: string
}

export const HelpPage = () => {
  const [activeIdx, setActiveIdx] = useState<number>()

  const [t] = useTranslation('helpPage')

  return (
    <section className={s.faq}>
      <Container>
        <TitleSection className={s.title}>FAQs</TitleSection>

        <div className={s.list}>
          {t('helpList', { returnObjects: true }).map(
            (item: IHelp, idx: number) => (
              <div className={s.item} key={idx}>
                <div className={s.question} onClick={() => setActiveIdx(idx)}>
                  <span>{item.title}</span>
                  <button className={cn({ [s.rotate]: activeIdx === idx })}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                    >
                      <path
                        d="M1 1L16 16"
                        stroke="#000"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16 1L0.999999 16"
                        stroke="#000"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
                <AnimateHeight height={activeIdx == idx ? 'auto' : 0}>
                  <div className={s.answercont}>{item.text}</div>
                </AnimateHeight>
              </div>
            ),
          )}
        </div>
      </Container>
    </section>
  )
}
