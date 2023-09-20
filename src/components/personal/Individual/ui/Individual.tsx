import { useTranslation } from 'react-i18next'

import { LightningText } from 'components/shared/LightningText'

import { IndividualList } from './IndividualList'

import s from './Individual.module.scss'

export const Individual = () => {
  const [t] = useTranslation('advanceBlock')

  const texts: string[] = t(`items`, {
    returnObjects: true,
    defaultValue: ['', ''],
  })

  return (
    <div className={s.block}>
      <div className={s.left}>
        <p
          className={s.text}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: t('description') }}
        />
        <ul className={s.list}>
          {texts.map((text, idx) => (
            <LightningText key={idx} text={text} />
          ))}
        </ul>
      </div>
      <IndividualList />
    </div>
  )
}
