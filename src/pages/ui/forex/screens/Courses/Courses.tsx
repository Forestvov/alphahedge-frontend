import { useTranslation } from 'react-i18next'
import { FC } from 'react'
import { Container } from 'components/shared/Container'
import { Course1Img, Course2Img } from 'assets/images'
import { CourseCard } from './CourseCard'
import s from './Courses.module.scss'

export const Courses: FC = () => {
  const [t] = useTranslation('forexPage')

  return (
    <section className={s.courses} id="courses">
      <Container>
        <h2 className={s.header}>{t('courses.title')}</h2>
        <div className={s.list}>
          <CourseCard
            image={Course1Img}
            label={t('courses.card1.label')}
            title={t('courses.card1.title')}
            description={t('courses.card1.description')}
            link="/course1"
          />
          <CourseCard
            image={Course2Img}
            label={t('courses.card2.label')}
            title={t('courses.card2.title')}
            description={t('courses.card2.description')}
            link="/course2"
          />
        </div>
      </Container>
    </section>
  )
}
