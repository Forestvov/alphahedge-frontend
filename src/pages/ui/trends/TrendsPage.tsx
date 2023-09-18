import { Container } from 'components/shared/Container'

import { TrendsHeader } from './screens/TrendsHeader/TrendsHeader'
import { TrendsList } from './screens/TrendsList/TrendsList'

import s from './TrendsPage.module.scss'

export const TrendsPage = () => (
  <section className={s.section}>
    <Container>
      <TrendsHeader />
      <TrendsList />
    </Container>
  </section>
)
