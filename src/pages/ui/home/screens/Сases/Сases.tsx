import { useTranslation } from 'react-i18next'

import { Container } from 'components/shared/Container'
import { TitleSection } from 'components/shared/TitleSection'

import { FirstCase, SecondCase } from 'assets/icons'
import { CasesBg } from 'assets/images'

import { Case } from './Case'

import s from './Сases.module.scss'

export const Сases = () => {
  const [t] = useTranslation('homeContent')

  return (
    <section className={s.section}>
      <Container>
        <TitleSection className={s.header} title={t('titleThird')} />
        <div className={s.list}>
          <Case
            title={t('briefTitleOne')}
            description={t('briefDescriptionOne')}
            image={FirstCase}
            link="/"
            linkText={t('briefLink')}
          />
          <Case
            title={t('briefTitleSecond')}
            description={t('briefDescriptionSecond')}
            image={SecondCase}
            link="/"
            linkText={t('briefLink')}
          />
        </div>
      </Container>
      <img className={s.bg} src={CasesBg} alt="bg" />
    </section>
  )
}
