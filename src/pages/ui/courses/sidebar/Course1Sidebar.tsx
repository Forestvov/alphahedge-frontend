import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from 'hooks/useWindowSize'
import { ArrowAccordionIcon, LockIcon } from 'assets/icons'
import { SidebarAccordion } from './SidebarAccordion'
import s from './Sidebar.module.scss'

export const Course1Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [showSidebar, setShowSidebar] = useState(true)
  const { width } = useWindowSize()
  const [t] = useTranslation('course1')

  useEffect(() => {
    if (width < 1500) {
      setShowSidebar(false)
    } else {
      setShowSidebar(true)
    }
  }, [width])

  const onToggleSidebar = () => {
    setShowSidebar((prevState) => !prevState)
  }

  const onToggle = () => {
    setIsOpen((prevState) => !prevState)
  }

  const sidebarCourse1Data = {
    header: t('sidebar.lesson1.header'),
    titles: [
      {
        label: t('sidebar.lesson1.title1'),
        value: 'whatIsOption',
      },
      {
        label: t('sidebar.lesson1.title2'),
        value: 'howWorkOption',
      },
      {
        label: t('sidebar.lesson1.title3'),
        value: 'call',
      },
      {
        label: t('sidebar.lesson1.title4'),
        value: 'premium',
      },
      {
        label: t('sidebar.lesson1.title5'),
        value: 'put',
      },
      {
        label: t('sidebar.lesson1.title6'),
        value: 'trade',
      },
    ],
  }

  return (
    <div className={showSidebar ? s.sidebar : `${s.sidebar} ${s.sidebar_hide}`}>
      {width < 1500 && (
        <button className={s.button} type="button" onClick={onToggleSidebar}>
          <img
            className={!showSidebar ? s.show : `${s.show} ${s.hide}`}
            src={ArrowAccordionIcon}
            alt="arrow"
          />
        </button>
      )}
      <SidebarAccordion
        header={sidebarCourse1Data.header}
        titles={sidebarCourse1Data.titles}
        isOpen={isOpen}
        onToggle={onToggle}
      />
      <button
        className={`${s.header} ${s.header_disabled}`}
        disabled
        type="button"
      >
        {t('sidebar.lesson2.header')}
        <img src={LockIcon} alt="lock" />
      </button>
      <button
        className={`${s.header} ${s.header_disabled}`}
        disabled
        type="button"
      >
        {t('sidebar.lesson3.header')}
        <img src={LockIcon} alt="lock" />
      </button>
      <button
        className={`${s.header} ${s.header_disabled}`}
        disabled
        type="button"
      >
        {t('sidebar.lesson4.header')}
        <img src={LockIcon} alt="lock" />
      </button>
      <button
        className={`${s.header} ${s.header_disabled}`}
        disabled
        type="button"
      >
        {t('sidebar.lesson5.header')}
        <img src={LockIcon} alt="lock" />
      </button>
      <button
        className={`${s.header} ${s.header_disabled}`}
        disabled
        type="button"
      >
        {t('sidebar.lesson6.header')}
        <img src={LockIcon} alt="lock" />
      </button>
    </div>
  )
}
