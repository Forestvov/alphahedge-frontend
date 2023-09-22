import { useTranslation } from 'react-i18next'
import { Course21, Course2Img } from 'assets/images'
import { TitleSection } from 'components/courses/TitleSection'
import { Course2Sidebar } from '../sidebar/Course2Sidebar'
import s from './Course2.module.scss'

export const Course2 = () => {
  const [t] = useTranslation('course2')

  return (
    <>
      <Course2Sidebar />
      <div className={s.course2}>
        <img className={s.courseImg} src={Course2Img} alt="course" />
        <section className={s.importantInvest} id="importantInvest">
          <TitleSection
            title={t('importantInvest.title')}
            label={t('importantInvest.label')}
          />
          <p className={s.text}>{t('importantInvest.text1')}</p>
          <ol>
            <li className={s.orderList}>{t('importantInvest.list1.item1')}</li>
            <li className={s.orderList}>{t('importantInvest.list1.item2')}</li>
            <li className={s.orderList}>{t('importantInvest.list1.item3')}</li>
            <li className={s.orderList}>{t('importantInvest.list1.item4')}</li>
          </ol>
          <p className={s.text}>{t('importantInvest.text2')}</p>
        </section>
        <section className={s.money} id="money">
          <TitleSection title={t('money.title')} label={t('money.label')} />
          <p className={s.text}>{t('money.text1')}</p>
          <p className={s.text}>{t('money.text2')}</p>
          <p className={s.text}>{t('money.text3')}</p>
        </section>
        <section className={s.inflation} id="inflation">
          <TitleSection
            title={t('inflation.title')}
            label={t('inflation.label')}
          />
          <p className={s.text}>{t('inflation.text1')}</p>
          <p className={s.text}>{t('inflation.text2')}</p>
          <p className={s.text}>{t('inflation.text3')}</p>
          <p className={s.text}>{t('inflation.text4')}</p>
          <p className={s.text}>{t('inflation.text5')}</p>
        </section>
        <section className={s.investWin} id="investWin">
          <TitleSection
            title={t('investWin.title')}
            label={t('investWin.label')}
          />
          <p className={s.text}>{t('investWin.text1')}</p>
          <p className={s.text}>{t('investWin.text2')}</p>
          <p className={s.text}>{t('investWin.text3')}</p>
          <ul>
            <li className={s.list}>
              <span>{t('investWin.list2.item1Bold')}</span>{' '}
              {t('investWin.list2.item1')}
            </li>
            <li className={s.list}>
              <span>{t('investWin.list2.item2Bold')}</span>{' '}
              {t('investWin.list2.item2')}
            </li>
          </ul>
          <p className={s.text}>{t('investWin.text4')}</p>
          <img className={s.image} src={Course21} alt="courseImg" />
        </section>
        <section className={s.magic} id="magic">
          <TitleSection title={t('magic.title')} label={t('magic.label')} />
          <p className={s.text}>{t('magic.text1')}</p>
          <ul>
            <li className={s.list}>{t('magic.list3.item1')}</li>
            <li className={s.list}>{t('magic.list3.item2')}</li>
          </ul>
          <p className={s.text}>{t('magic.text2')}</p>
          <p className={s.text}>{t('magic.text3')}</p>
          <p className={s.text}>{t('magic.text4')}</p>
          <ul>
            <li className={s.list}>{t('magic.list4.item1')}</li>
            <li className={s.list}>{t('magic.list4.item2')}</li>
            <li className={s.list}>{t('magic.list4.item3')}</li>
          </ul>
        </section>
      </div>
    </>
  )
}
