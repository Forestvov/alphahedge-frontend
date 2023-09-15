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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="120"
        height="51"
        viewBox="0 0 120 51"
        fill="none"
      >
        <path
          className="circle-progress"
          d="M118.333 15.7188V35.004C118.333 42.736 112.065 49.004 104.333 49.004H15C7.26802 49.004 1 42.736 1 35.004V15.7188C1 7.98677 7.26802 1.71875 15 1.71875H37.4574H104.333C112.065 1.71875 118.333 7.98676 118.333 15.7188Z"
          stroke="#B050F2"
          strokeWidth="2"
          strokeDasharray="383.5"
        />
      </svg>
    </div>
  )
}
