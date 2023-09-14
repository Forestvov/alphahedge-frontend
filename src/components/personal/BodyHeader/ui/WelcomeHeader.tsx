import { useEffect } from 'react'

import useProfile from 'hooks/context/useProfile'

import s from './BodyHeader.module.scss'

export const WelcomeHeader = () => {
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
    const monthsString = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ]

    const now = new Date()
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    return `${day} ${monthsString[month - 1]} ${year}`
  }

  return (
    <div className={s.welcome}>
      <div className={s.name}>Добро пожаловать, {profile?.im} !</div>
      <div className={s.data}>
        <div id="digital-clock" /> <span /> {getCurrentDate()}
      </div>
    </div>
  )
}
