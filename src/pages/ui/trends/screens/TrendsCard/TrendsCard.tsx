import { clearDate } from 'helpers/clearDate'

import { ITrendCard } from 'models/response/TrendResponse'

import s from './TrendsCard.module.scss'

export const TrendsCard = (props: ITrendCard) => {
  const { image_url, url, source, title, published_at, description } = props

  return (
    <article className={s.article}>
      <div className={s.image}>
        <img src={image_url} alt="img" />
      </div>
      <a
        className={s.type}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {source}
      </a>
      <a
        className={s.link}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
        >
          <path
            d="M1.33398 11L11.334 1M11.334 1H1.33398M11.334 1V11"
            stroke="#101828"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
      <p className={s.description}>{description}</p>
      <div className={s.date}>{clearDate(published_at)}</div>
    </article>
  )
}
