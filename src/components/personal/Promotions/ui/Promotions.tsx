import { useTranslation } from 'react-i18next'

import { PromotionsList } from './PromotionsList'

import s from './Promotions.module.scss'

export const Promotions = () => {
  const [p] = useTranslation('panel')
  return (
    <div className={s.body}>
      <h2 className={s.title}>{p('promotionTitle')}</h2>
      <PromotionsList />
    </div>
  )
}
