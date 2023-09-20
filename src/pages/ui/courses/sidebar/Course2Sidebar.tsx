import { useEffect, useState } from 'react'
import { useWindowSize } from 'hooks/useWindowSize'
import { ArrowAccordionIcon, LockIcon } from 'assets/icons'
import { SidebarAccordion } from './SidebarAccordion'
import s from './Sidebar.module.scss'

const sidebarCourse2Data = {
  header: 'Урок 1. Почему важно инвестировать?  ',
  titles: [
    {
      label: 'Почему важно инвестировать?',
      value: 'importantInvest',
    },
    {
      label: 'Деньги — это важный ресурс, они влияют на нашу жизнь',
      value: 'money',
    },
    {
      label:
        'Инфляция — это рост цен и снижение покупательной способности денег.',
      value: 'inflation',
    },
    {
      label: 'Инвестиции помогут победить инфляцию и заработать',
      value: 'investWin',
    },
    {
      label: 'Магия сложного процента увеличивает вложения',
      value: 'magic',
    },
  ],
}

export const Course2Sidebar = () => {
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
        Урок 2. Во что и как инвестировать
        <img src={LockIcon} alt="lock" />
      </button>
      <button
        className={`${s.header} ${s.header_disabled}`}
        disabled
        type="button"
      >
        Урок 3. Акции: как инвестировать в бизнес?
        <img src={LockIcon} alt="lock" />
      </button>
      <button
        className={`${s.header} ${s.header_disabled}`}
        disabled
        type="button"
      >
        Урок 4. Облигации: как дать в долг компании или государству?
        <img src={LockIcon} alt="lock" />
      </button>
      <button
        className={`${s.header} ${s.header_disabled}`}
        disabled
        type="button"
      >
        Урок 5. ETF: как инвестировать сразу в несколько компаний
        <img src={LockIcon} alt="lock" />
      </button>
      <button
        className={`${s.header} ${s.header_disabled}`}
        disabled
        type="button"
      >
        Урок 6. Портфель: как достичь инвестиционных целей
        <img src={LockIcon} alt="lock" />
      </button>
    </div>
  )
}
