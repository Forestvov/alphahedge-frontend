import { useTranslation } from 'react-i18next'

import s from './TrendsHeader.module.scss'

export const TrendsHeader = () => {
  const [t] = useTranslation('trends')

  return (
    <div className={s.header}>
      <h1 className={s.title}>{t('title')}</h1>
      <p className={s.sub}>{t('description')}</p>
    </div>
  )
}
