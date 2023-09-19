import { MapPoint } from 'assets/icons'

import { ISpeaker } from './Speaker.interface'

import s from './Speakers.module.scss'

export const Speaker = (props: ISpeaker) => {
  const { date, image, title, country } = props

  return (
    <article className={s.speaker}>
      <div className={s.image}>
        <img src={image} alt={title} />
      </div>
      <div className={s.metaInfo}>
        <div className={s.data}>{date}</div>
        <div className={s.position}>
          <img src={MapPoint} alt="Лондон" />
          <span>{country}</span>
        </div>
      </div>
      <div className={s.name}>{title}</div>
    </article>
  )
}
