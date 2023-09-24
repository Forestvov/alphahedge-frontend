import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from 'hooks/useWindowSize'
import { ArrowAccordionIcon, LockIcon } from 'assets/icons'
import { SidebarAccordion } from './SidebarAccordion'
import s from './Sidebar.module.scss'

export const Course2Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [showSidebar, setShowSidebar] = useState(true)
  const { width } = useWindowSize()
  const [t] = useTranslation('course2')

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

  const sidebarCourse2Data = {
    header: t('sidebar.lesson1.header'),
    titles: [
      {
        label: t('sidebar.lesson1.title1'),
        value: 'importantInvest',
      },
      {
        label: t('sidebar.lesson1.title2'),
        value: 'money',
      },
      {
        label: t('sidebar.lesson1.title3'),
        value: 'inflation',
      },
      {
        label: t('sidebar.lesson1.title4'),
        value: 'investWin',
      },
      {
        label: t('sidebar.lesson1.title5'),
        value: 'magic',
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
        header={sidebarCourse2Data.header}
        titles={sidebarCourse2Data.titles}
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
