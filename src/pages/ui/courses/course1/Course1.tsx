import { useTranslation } from 'react-i18next'
import {
  Course1Img,
  Course11,
  Course12,
  Course13,
  Course14,
  Course15,
  Course16,
  Course17,
} from 'assets/images'
import { TitleSection } from 'components/courses/TitleSection'
import { Course1Sidebar } from '../sidebar/Course1Sidebar'
import s from './Course1.module.scss'

export const Course1 = () => {
  const [t] = useTranslation('course1')

  return (
    <>
      <Course1Sidebar />
      <div className={s.course1}>
        <img className={s.courseImg} src={Course1Img} alt="course" />
        <section className={s.whatIsOption} id="whatIsOption">
          <TitleSection
            title={t('whatIsOption.title')}
            label={t('whatIsOption.label')}
          />
          <p className={s.text}>{t('whatIsOption.text1')}</p>
          <p className={s.text}>{t('whatIsOption.text2')}</p>
          <img className={s.image} src={Course11} alt="courseImg" />
          <p className={s.text}>{t('whatIsOption.text3')}</p>
          <p className={s.text}>
            <span> {t('whatIsOption.text4Bold')}</span> —
            {t('whatIsOption.text4')}
          </p>
          <p className={s.text}>{t('whatIsOption.text5')}</p>
          <p className={s.text}>
            <span> {t('whatIsOption.text6Bold')}</span>{' '}
            {t('whatIsOption.text6')}
          </p>
        </section>
        <section className={s.howWorkOption} id="howWorkOption">
          <TitleSection
            title={t('howWorkOption.title')}
            label={t('howWorkOption.label')}
          />
          <p className={s.text}>title={t('howWorkOption.text1')}</p>
          <p className={s.text}>title={t('howWorkOption.text2')}</p>
          <p className={s.text}>title={t('howWorkOption.text3')}</p>
          <img className={s.image} src={Course12} alt="courseImg" />
          <p className={s.text}>title={t('howWorkOption.text4')}</p>
        </section>
        <section className={s.call} id="call">
          <TitleSection title={t('call.title')} label={t('call.label')} />
          <p className={s.text}>{t('call.text1')}</p>
          <ul>
            <li className={s.list}>{t('call.list1.item1')}</li>
            <li className={s.list}>{t('call.list1.item2')}</li>
            <li className={s.list}>{t('call.list1.item3')}</li>
          </ul>
          <img className={s.image} src={Course13} alt="courseImg" />
          <p className={s.text}>
            {t('call.text2')} <span>{t('call.text2Bold')}</span> В
            {t('call.text3')}
          </p>
          <p className={s.text}>
            <span>{t('call.text4Bold')}</span> {t('call.text4')}
          </p>
          <p className={s.text}>
            {t('call.tex5')} <span>{t('call.text5Bold')}</span>
            {t('call.text6')}
          </p>
          <p className={s.text}>
            <span>{t('call.text7Bold')}</span> {t('call.text7')}
          </p>
          <p className={s.text}>{t('call.text8')}</p>
          <p className={s.text}>
            <span>{t('call.text9Bold')}</span>
          </p>
          <p className={s.text}>{t('call.text9')}</p>
          <img className={s.image} src={Course14} alt="courseImg" />
          <p className={s.text}>{t('call.text10')}</p>
          <p className={s.text}>{t('call.text11')}</p>
          <p className={s.text}>
            <span>{t('call.text12Bold')}</span>
          </p>
          <p className={s.text}>{t('call.text12')}</p>
          <p className={s.text}>{t('call.text13')}</p>
          <p className={s.text}>
            <span>{t('call.text14Bold')}</span> —{t('call.text14')}
          </p>
          <p className={s.text}>{t('call.text15')}</p>
          <img className={s.image} src={Course15} alt="courseImg" />
          <p className={s.text}>{t('call.text16')}</p>
        </section>
        <section className={s.premium} id="premium">
          <TitleSection title={t('premium.title')} label={t('premium.label')} />
          <p className={s.text}>label={t('premium.text1')}</p>
          <img className={s.image} src={Course16} alt="courseImg" />
          <p className={s.text}>label={t('premium.text2')}</p>
        </section>
        <section className={s.put} id="put">
          <TitleSection title={t('put.title')} label={t('put.label')} />
          <p className={s.text}>{t('put.text1')}</p>
          <p className={s.text}>{t('put.text2')}</p>
          <p className={s.text}>{t('put.text3')}</p>
          <p className={s.text}>{t('put.text4')}</p>
          <ul>
            <li className={s.list}>{t('put.list1.item1')}</li>
            <li className={s.list}>{t('put.list1.item2')}</li>
            <li className={s.list}>{t('put.list1.item3')}</li>
          </ul>
          <p className={s.text}>
            {t('put.text5')} <span>{t('put.text5Bold')}</span>
            {t('put.text6')}
          </p>
          <p className={s.text}>
            <span>{t('put.text7Bold')}</span> {t('put.text7')}
          </p>
        </section>
        <section className={s.trade} id="trade">
          <TitleSection title={t('trade.title')} label={t('trade.label')} />
          <p className={s.text}>{t('trade.text1')}</p>
          <p className={s.text}>{t('trade.text2')}</p>
          <p className={s.text}>{t('trade.text3')}</p>
          <img className={s.image} src={Course17} alt="courseImg" />
          <p className={s.text}>{t('trade.text4')}</p>
        </section>
      </div>
    </>
  )
}
