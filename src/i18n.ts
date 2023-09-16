import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import common_ru from './translations/ru/common.json'
import simpleCard_ru from './translations/ru/simpleCard.json'
import advanceBlock_ru from './translations/ru/advanceBlock.json'
import helpPage_ru from './translations/ru/helpPage.json'

i18next.use(initReactI18next).init({
  resources: {
    ru: {
      common: common_ru,
      advanceBlock: advanceBlock_ru,
      simpleCard: simpleCard_ru,
      helpPage: helpPage_ru,
    },
  },
  lng: 'ru',
  interpolation: {
    escapeValue: false,
  },
})

export default i18next
