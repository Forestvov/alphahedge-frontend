import { useLocation } from 'react-router'

import AnimateHeight from 'react-animate-height'

import { ArrowAccordionIcon } from 'assets/icons'
import s from './Sidebar.module.scss'

interface SidebarAccordionProps {
  header: string
  titles: {
    label: string
    value: string
  }[]

  isOpen: boolean
  onToggle: () => void
}

export const SidebarAccordion = (props: SidebarAccordionProps) => {
  const { header, titles, isOpen, onToggle } = props
  const { pathname } = useLocation()

  return (
    <div className={s.item}>
      <button className={s.header} type="button" onClick={() => onToggle()}>
        {header}
        <img
          className={isOpen ? s.active : ''}
          src={ArrowAccordionIcon}
          alt="arrow"
        />
      </button>
      <AnimateHeight height={isOpen ? 'auto' : 0}>
        <ul className={s.content}>
          {titles.map((title) => (
            <li className={s.item} key={title.label}>
              {pathname === '/course1' ? (
                <a href={`/course1#${title.value}`}>{title.label}</a>
              ) : (
                <a href={`/course2#${title.value}`}>{title.label}</a>
              )}
            </li>
          ))}
        </ul>
      </AnimateHeight>
    </div>
  )
}
