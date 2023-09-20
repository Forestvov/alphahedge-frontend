// @ts-nocheck
/* eslint-disable */
import { useEffect } from 'react'

import { CountdownTimer } from './TimerClass'

import s from './TransactionPopup.module.scss'
import cn from 'classnames'

export const TransactionPopupTimer = ({ timestamp, setStatus }) => {
  useEffect(() => {
    // 1. Получим элементы в которые нужно вывести оставшееся количество дней, часов, минут и секунд
    /* const elDays1 = document.querySelector('.TokenSale_Days .number');
    const elHours1 = document.querySelector('.TokenSale_Hours .number'); */
    const elMinutes1 = document.querySelector('.minutes')
    const elSeconds1 = document.querySelector('.seconds')

    // 2. Установим время, например, на одну минуту от текущей даты
    const deadline1 = new Date(timestamp)
    deadline1.setMinutes(deadline1.getMinutes() + 20)

    // 3. Создадим новый объект, используя new CountdownTimer()
    new CountdownTimer(
      deadline1,
      (timer) => {
        // elDays1.textContent = timer.days;
        // elHours1.textContent = timer.hours;
        elMinutes1.textContent = timer.minutes
        elSeconds1.textContent = timer.seconds
        if (timer.minutes == 0 && timer.seconds == 0) {
          setStatus('Cancelled')
        }
        // elDays1.dataset.title = timer.daysTitle;
        // elHours1.dataset.title = timer.hoursTitle;
        elMinutes1.dataset.title = timer.minutesTitle
        elSeconds1.dataset.title = timer.secondsTitle
      },
      () => {},
    )
  })

  return (
    <div className={cn(s.timer)}>
      <span className="minutes" />:<span className="seconds" />
    </div>
  )
}
