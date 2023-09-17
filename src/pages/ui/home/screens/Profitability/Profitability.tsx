import { useTranslation } from 'react-i18next'

import { Container } from 'components/shared/Container'
import { TitleSection } from 'components/shared/TitleSection'

import { ProfitabilityBg } from 'assets/images'

import { ProfitabilityTable } from './ProfitabilityTable'

import s from './Profitability.module.scss'

export const Profitability = () => {
  const [t] = useTranslation('homeContent')

  return (
    <section className={s.section}>
      <Container>
        <div className={s.content}>
          <TitleSection className={s.title} title={t('titleSecond')} />
          <ProfitabilityTable />
        </div>
      </Container>
      <img className={s.bg} src={ProfitabilityBg} alt="bg" />
    </section>
  )
}
