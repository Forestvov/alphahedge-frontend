import { useEffect, useState } from 'react'
import { useWindowSize } from 'hooks/useWindowSize'
import { ArrowAccordionIcon, LockIcon } from 'assets/icons'
import { SidebarAccordion } from './SidebarAccordion'
import s from './Sidebar.module.scss'

const sidebarCourse1Data = {
  header: 'Урок 1. Торговля опционами, форекс.',
  titles: [
    {
      label: 'Что такое опционы',
      value: 'whatIsOption',
    },
    {
      label: 'Как работает опцион',
      value: 'howWorkOption',
    },
    {
      label: 'Что такое опцион колл',
      value: 'call',
    },
    {
      label: 'Как формируется размер премии',
      value: 'premium',
    },
    {
      label: 'Что такое опцион пут',
      value: 'put',
    },
    {
      label: 'Что следует помнить при торговле опционами',
      value: 'trade',
    },
  ],
}

export const Course1Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [showSidebar, setShowSidebar] = useState(true)
  const { width } = useWindowSize()

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
        Урок 2. Форекс
        <img src={LockIcon} alt="lock" />
      </button>
      <button
        className={`${s.header} ${s.header_disabled}`}
        disabled
        type="button"
      >
        Урок 3. Практика управление позиций
        <img src={LockIcon} alt="lock" />
      </button>
      <button
        className={`${s.header} ${s.header_disabled}`}
        disabled
        type="button"
      >
        Урок 4. Концепт смарт-Мани
        <img src={LockIcon} alt="lock" />
      </button>
      <button
        className={`${s.header} ${s.header_disabled}`}
        disabled
        type="button"
      >
        Урок 5. Торговые стратегии
        <img src={LockIcon} alt="lock" />
      </button>
      <button
        className={`${s.header} ${s.header_disabled}`}
        disabled
        type="button"
      >
        Урок 6. Лайв торговля
        <img src={LockIcon} alt="lock" />
      </button>
    </div>
  )
}
