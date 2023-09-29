const options: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  weekday: 'long',
  hour: 'numeric',
  minute: 'numeric',
  year: 'numeric',
}

export const disableWeekend = (): boolean => {
  const currentTime = new Date()
  const formattedTime = currentTime
    .toLocaleTimeString('en-GB', options)
    .split(',')[0]

  return formattedTime === 'Saturday' || formattedTime === 'Sunday'
}
