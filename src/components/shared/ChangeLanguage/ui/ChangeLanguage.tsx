import { useTranslation } from 'react-i18next'

import { DeiImage, EngImage, RusImage } from 'assets/images'

import s from './ChangeLanguage.module.scss'

export const ChangeLanguage = () => {
  const { i18n } = useTranslation()

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className={s.wrapper}>
      <button className={s.btn} type="button">
        {i18n.language}
      </button>
      <div className={s.overlay}>
        <div className={s.dropDown}>
          {i18n.language !== 'ru' && (
            <button type="button" onClick={() => changeLang('ru')}>
              <img src={RusImage} alt="Ru" />
              Русский
            </button>
          )}
          {i18n.language !== 'en' && (
            <button type="button" onClick={() => changeLang('en')}>
              <img src={EngImage} alt="Deil" />
              English
            </button>
          )}
          {i18n.language !== 'de' && (
            <button type="button" onClick={() => changeLang('de')}>
              <img src={DeiImage} alt="Deil" />
              Deutsch
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
