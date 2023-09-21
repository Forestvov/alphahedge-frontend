import { useTranslation } from 'react-i18next'

import { useNavigate } from 'react-router-dom'
import s from './Courses.module.scss'

interface ICourseCard {
  image: string
  label: string
  title: string
  description: string
  link: string
}

export const CourseCard = (props: ICourseCard) => {
  const { description, image, title, link, label } = props
  const navigate = useNavigate()
  const [t] = useTranslation('forexPage')

  return (
    <div className={s.course}>
      <img className={s.image} src={image} alt={title} />
      <span className={s.label}>{label}</span>
      <h3 className={s.title}>{title}</h3>
      <p className={s.description}>{description}</p>
      <button className={s.button} type="button" onClick={() => navigate(link)}>
        {t('courses.button')}
      </button>
    </div>
  )
}
