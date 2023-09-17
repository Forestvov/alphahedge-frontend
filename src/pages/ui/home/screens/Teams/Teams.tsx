import { useTranslation } from 'react-i18next'

import { Lightning } from 'assets/icons'

import { Container } from 'components/shared/Container'
import { TitleSection } from 'components/shared/TitleSection'
import { TeamImage } from 'assets/images'

import s from './Teams.module.scss'

export const Teams = () => {
  const [t] = useTranslation('homeContent')

  return (
    <section className={s.section}>
      <Container>
        <div className={s.left}>
          <TitleSection className={s.header} title={t('teamTitle')} />
          <ul className={s.list}>
            {t('teamList', { returnObjects: true, defaultValue: ['', ''] }).map(
              (text: string, idx: number) => (
                <li key={idx}>
                  <img src={Lightning} alt="icon" />
                  <span>{text}</span>
                </li>
              ),
            )}
          </ul>
        </div>
        <img className={s.image} src={TeamImage} alt="team" />
      </Container>
    </section>
  )
}
