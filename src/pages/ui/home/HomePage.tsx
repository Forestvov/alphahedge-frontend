import { MainBanner } from './screens/MainBanner/MainBanner'
import { Uniqueness } from './screens/Uniqueness/Uniqueness'
import { Profitability } from './screens/Profitability/Profitability'
import { Cases } from './screens/Сases/Сases'
import { Teams } from './screens/Teams/Teams'
import { Speakers } from './screens/Speakers/Speakers'

export const HomePage = () => (
  <>
    <MainBanner />
    <Uniqueness />
    <Profitability />
    <Cases />
    <Teams />
    <Speakers />
  </>
)
