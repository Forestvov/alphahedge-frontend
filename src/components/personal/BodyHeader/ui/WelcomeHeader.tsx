import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import useProfile from 'hooks/context/useProfile'

import s from './BodyHeader.module.scss'

export const WelcomeHeader = () => {
  const [t] = useTranslation('personalNavigation')
  const [m] = useTranslation('months')

  const {
    payload: { profile },
  } = useProfile()

  const getCurrentTime = (): string => {
    const date = new Date()
    const currentTime = `${date.getHours()}:${date.getMinutes()}`

    return `${currentTime}`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // @ts-ignore
      // eslint-disable-next-line no-use-before-define
      document.getElementById('digital-clock').innerHTML = getCurrentTime()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const getCurrentDate = () => {
    const monthsString = m('months', {
      returnObjects: true,
      defaultValue: ['', ''],
    }).map((month: string) => month)

    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    return `${day} ${monthsString[month]} ${year}`
  }

  return (
    <div className={s.welcome}>
      <div className={s.name}>
        {t('welcome')}, {profile?.im} !
      </div>
      <div className={s.data}>
        <div id="digital-clock" /> <span /> {getCurrentDate()}
      </div>
    </div>
  )
}
