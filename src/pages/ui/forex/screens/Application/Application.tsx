import { useTranslation } from 'react-i18next'
import { FC } from 'react'
import { Container } from 'components/shared/Container'
import { FormImg1, FormImg2 } from 'assets/images'
import { DividerIcon } from 'assets/icons'
import { Card } from './Card'
import s from './Application.module.scss'

export const Application: FC = () => {
  const [t] = useTranslation('forexPage')

  const cardData = [
    {
      title: t('application.card1.title'),
      desc: t('application.card1.desc'),
    },
    {
      title: t('application.card2.title'),
      desc: t('application.card2.desc'),
    },
    {
      title: t('application.card3.title'),
      desc: t('application.card3.desc'),
    },
    {
      title: t('application.card4.title'),
      desc: t('application.card4.desc'),
    },
    {
      title: t('application.card5.title'),
      desc: t('application.card5.desc'),
    },
    {
      title: t('application.card6.title'),
      desc: t('application.card6.desc'),
    },
    {
      title: t('application.card7.title'),
      desc: t('application.card7.desc'),
    },
  ]

  return (
    <section className={s.application}>
      <Container>
        <div className={s.content}>
          <div className={s.form}>
            <div className={s.form_content}>
              <h2 className={s.title}>{t('application.title')}</h2>
              <p className={s.text}>{t('application.text')}</p>
              <div className={s.input_container}>
                <input
                  className={s.input}
                  type="email"
                  placeholder={t('application.inputPlaceholder')}
                />
                <button className={s.button} type="button">
                  {t('application.inputButton')}
                </button>
              </div>
              <div className={s.bottom}>
                <div className={s.numbers}>
                  <span>294+</span>
                  <p>
                    {t('application.bottomText1')}
                    <br />
                    {t('application.bottomText2')}
                  </p>
                </div>
                <img src={DividerIcon} alt="" />
                <div className={s.numbers}>
                  <span>$10 M+</span>
                  <p>
                    {t('application.bottomText3')}
                    <br />
                    {t('application.bottomText4')}
                  </p>
                </div>
              </div>
            </div>
            <div className={s.images}>
              <img className={s.image1} src={FormImg1} alt="formImg" />
              <img className={s.image2} src={FormImg2} alt="formImg" />
            </div>
          </div>
          <div className={s.list}>
            {cardData.map((card) => (
              <Card
                title={card.title}
                description={card.desc}
                key={card.title}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
