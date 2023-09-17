import { Link } from 'react-router-dom'

import { ArrowLinkPink } from 'assets/icons'

import s from './Сases.module.scss'

interface ICase {
  image: string
  title: string
  description: string
  link: string
  linkText: string
}

export const Case = (props: ICase) => {
  const { description, image, title, link, linkText } = props

  return (
    <div className={s.case}>
      <img className={s.image} src={image} alt={title} />
      <h3 className={s.title}>{title}</h3>
      <p className={s.description}>{description}</p>
      <Link className={s.link} to={link}>
        {linkText} <img src={ArrowLinkPink} alt="link" />
      </Link>
    </div>
  )
}
